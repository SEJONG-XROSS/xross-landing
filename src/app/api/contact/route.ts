import { parseContact, type ContactInput } from "@/lib/contact";

function format(d: ContactInput) {
  return [
    "*XROSS 도입 상담 신청*",
    `성함/담당자: ${d.name}`,
    `연락처: ${d.phone}`,
    `매장 유형: ${d.storeType}`,
    `운영 매장 수: ${d.storeCount || "-"}`,
    `매장 지역: ${d.region || "-"}`,
    `시범 도입 관심: ${d.pilot ? "예" : "아니오"}`,
    `가장 큰 어려움: ${d.pain || "-"}`,
    `문의 내용: ${d.message || "-"}`,
  ].join("\n");
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, message: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  // honeypot: real users never fill this hidden field
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return Response.json({ ok: true });
  }

  const { data, errors } = parseContact(raw);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const submittedAt = new Date().toISOString();
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL 미설정, 개발 모드에서 로그로만 기록합니다.\n" + format(data));
      return Response.json({ ok: true });
    }
    console.error("[contact] CONTACT_WEBHOOK_URL is not set; inquiry was not delivered.");
    return Response.json(
      { ok: false, message: "지금은 문의를 접수할 수 없습니다. 잠시 후 다시 시도해 주세요." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // `text` works for Slack/Discord-style webhooks; the rest is for custom receivers
      // (e.g. the Google Apps Script in scripts/google-sheets-contact.gs, which checks `secret`)
      body: JSON.stringify({
        text: format(data),
        content: format(data),
        submittedAt,
        secret: process.env.CONTACT_WEBHOOK_SECRET,
        ...data,
      }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    // Apps Script answers 200 even on failure, so honour an explicit { ok: false } body
    const reply = await res.text();
    try {
      const parsed = JSON.parse(reply);
      if (parsed && parsed.ok === false) throw new Error(`webhook rejected: ${parsed.error ?? "unknown"}`);
    } catch (e) {
      if (!(e instanceof SyntaxError)) throw e;
    }
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return Response.json(
      { ok: false, message: "문의를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
