"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { pains, storeCounts, storeTypes, type FieldErrors } from "@/lib/contact";

const input =
  "mt-1.5 block w-full rounded-lg border border-line bg-white px-3.5 py-3 text-[0.9375rem] text-ink placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20 aria-[invalid=true]:border-[#d4380d]";

function Field({
  id,
  label,
  required,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required ? (
          <span className="ml-1 text-signal">(필수)</span>
        ) : (
          <span className="ml-1 font-normal text-muted">(선택)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#d4380d]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = Object.fromEntries(fd.entries());
    setStatus("sending");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("done");
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        const first = Object.keys(json.errors)[0];
        (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      }
      setMessage(json.message ?? "입력한 내용을 확인해 주세요.");
      setStatus("error");
    } catch {
      setMessage("네트워크 연결을 확인한 뒤 다시 시도해 주세요.");
      setStatus("error");
    }
  }

  const aria = (k: keyof FieldErrors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  return (
    <section id="contact" className="bg-ink py-24 text-white md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="h-section lg:text-[2.375rem]">
            무인매장 관리의 새로운 방식,
            <br />
            XROSS와 함께 시작하세요.
          </h2>
          <p className="mt-5 max-w-md leading-[1.75] text-haze">
            운영 중인 매장에 XROSS를 도입하고 싶으신가요? 매장 환경에 맞는
            도입 방법을 함께 확인해 보세요.
          </p>
          <ul className="mt-10 space-y-4 text-[0.9375rem]">
            {[
              "남겨 주신 연락처로 담당자가 직접 연락드립니다.",
              "매장 환경과 필요한 장비·연동 조건을 함께 검토합니다.",
              "비용과 이용 조건은 아직 확정 전이며, 상담 시 현재 기준으로 안내합니다.",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-haze">
                <svg width="18" height="18" viewBox="0 0 16 16" className="mt-1 shrink-0 text-sky" aria-hidden>
                  <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 text-ink md:p-9">
          {status === "done" ? (
            <div className="flex min-h-[28rem] flex-col items-start justify-center" role="status">
              <span className="grid size-12 place-items-center rounded-full bg-signal/10 text-signal">
                <svg width="22" height="22" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em]">도입 상담 신청이 접수되었습니다</h3>
              <p className="mt-3 leading-[1.75] text-muted">
                남겨 주신 연락처로 담당자가 연락드리겠습니다.
                <br />
                추가로 전할 내용이 있다면 다시 신청해 주셔도 됩니다.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="btn btn-ghost-light mt-8"
              >
                새로 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="성함 또는 담당자명" required error={errors.name}>
                <input id="name" name="name" autoComplete="name" className={input} {...aria("name")} />
              </Field>
              <Field id="phone" label="연락처" required error={errors.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="010-0000-0000"
                  className={input}
                  {...aria("phone")}
                />
              </Field>
              <Field id="storeType" label="매장 유형" required error={errors.storeType}>
                <select id="storeType" name="storeType" defaultValue="" className={input} {...aria("storeType")}>
                  <option value="" disabled>
                    선택해 주세요
                  </option>
                  {storeTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field id="storeCount" label="운영 매장 수">
                <select id="storeCount" name="storeCount" defaultValue="" className={input}>
                  <option value="">선택 안 함</option>
                  {storeCounts.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field id="region" label="매장 지역" className="sm:col-span-2">
                <input id="region" name="region" placeholder="예: 서울 송파구" className={input} />
              </Field>
              <Field id="pain" label="현재 매장 운영 시 가장 큰 어려움" className="sm:col-span-2">
                <select id="pain" name="pain" defaultValue="" className={input}>
                  <option value="">선택 안 함</option>
                  {pains.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field id="message" label="문의 내용" className="sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="매장 상황이나 궁금한 점을 자유롭게 남겨 주세요."
                  className={`${input} resize-y`}
                />
              </Field>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-paper px-4 py-3.5 sm:col-span-2">
                <input type="checkbox" name="pilot" className="size-4.5 accent-signal" />
                <span className="text-[0.9375rem]">
                  시범 도입에 관심이 있어요 <span className="text-muted">(선택)</span>
                </span>
              </label>

              {/* honeypot */}
              <div aria-hidden className="absolute -left-[9999px]">
                <label htmlFor="website">웹사이트</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="sm:col-span-2">
                <details className="rounded-lg border border-line px-4 py-3 text-sm text-muted">
                  <summary className="cursor-pointer font-semibold text-ink">개인정보 수집 및 이용 안내</summary>
                  <dl className="mt-3 space-y-1.5 leading-[1.7]">
                    <div>
                      <dt className="inline font-semibold">수집 항목: </dt>
                      <dd className="inline">성함 또는 담당자명, 연락처, 매장 유형 (선택: 운영 매장 수, 매장 지역, 문의 내용, 시범 도입 관심 여부, 운영상 어려움)</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold">이용 목적: </dt>
                      <dd className="inline">도입 상담 연락 및 매장 환경 검토, 서비스 개선을 위한 요구사항 파악</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold">보유 기간: </dt>
                      <dd className="inline">상담 완료 후 1년간 보관 후 파기 (요청 시 즉시 파기)</dd>
                    </div>
                    <p>동의를 거부할 수 있으며, 거부 시 상담 신청이 제한됩니다.</p>
                  </dl>
                </details>
                <label className="mt-3 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    className="mt-1 size-4.5 accent-signal"
                    {...aria("consent")}
                  />
                  <span className="text-[0.9375rem]">
                    개인정보 수집 및 이용에 동의합니다 <span className="text-signal">(필수)</span>
                  </span>
                </label>
                {errors.consent && (
                  <p id="consent-error" className="mt-1.5 text-sm text-[#d4380d]">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary w-full disabled:opacity-60"
                >
                  {status === "sending" ? "신청하는 중…" : "도입 상담 신청하기"}
                </button>
                {status === "error" && message && (
                  <p role="alert" className="mt-3 text-sm text-[#d4380d]">
                    {message}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
