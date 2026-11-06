import { paid, picked, won } from "@/lib/scenario";

function CamFeed({ name, box }: { name: string; box?: boolean }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-[#0b1733]">
      <svg viewBox="0 0 160 90" className="absolute inset-0 size-full" preserveAspectRatio="none" aria-hidden>
        <path d="M0 90 L60 40 L100 40 L160 90Z" fill="#12224a" />
        <path d="M0 0 L60 40 L60 0Z M160 0 L100 40 L100 0Z" fill="#0f1d40" />
        <rect x="8" y="30" width="34" height="40" fill="#16295a" />
        <rect x="118" y="30" width="34" height="40" fill="#16295a" />
        {box && (
          <g>
            <rect x="66" y="34" width="18" height="40" rx="2" fill="none" stroke="#3aa8ff" strokeWidth="1" />
            <rect x="66" y="27" width="22" height="7" fill="#3aa8ff" />
            <text x="67.5" y="32.6" fontSize="5" fontWeight="700" fill="#081229">고객 A</text>
          </g>
        )}
      </svg>
      <span className="absolute left-2 top-1.5 text-[10px] text-haze">{name}</span>
      <span className="absolute right-2 top-1.5 flex items-center gap-1 text-[10px] text-white">
        <span className="size-1.5 rounded-full bg-[#ff5a5a]" />
        REC
      </span>
    </div>
  );
}

const events = [
  { time: "22:41", title: "미결제 의심", desc: "딸기 컵 1개 결제 확인 안 됨, 경고 방송 송출", tone: "alert" },
  { time: "20:15", title: "장기 체류 후보", desc: "진열대 앞 12분 체류", tone: "info" },
  { time: "18:02", title: "미결제 의심", desc: "점주 확인 완료", tone: "done" },
] as const;

function WebMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
      </div>
      <div className="grid grid-cols-[56px_1fr] md:grid-cols-[150px_1fr]">
        <aside className="border-r border-white/10 p-3 text-[13px] text-haze">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark.png" alt="" className="mb-5 size-6" />
          <ul className="hidden space-y-1 md:block">
            <li className="rounded-md bg-white/10 px-2.5 py-1.5 text-white">실시간 관제</li>
            <li className="px-2.5 py-1.5">이벤트</li>
            <li className="px-2.5 py-1.5">영상 기록</li>
            <li className="px-2.5 py-1.5">매장 관리</li>
          </ul>
        </aside>
        <div className="p-4 md:p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <p className="font-semibold text-white">무인 아이스크림 1호점</p>
            <p className="tnum text-xs text-haze">2026.11.06 22:41</p>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
            <div className="grid grid-cols-2 gap-2">
              <CamFeed name="CAM 1 출입구" />
              <CamFeed name="CAM 2 냉동고" box />
              <CamFeed name="CAM 3 진열대" />
              <CamFeed name="CAM 4 키오스크" />
            </div>
            <div>
              <p className="mb-2 text-xs text-haze">오늘의 이벤트</p>
              <ul className="space-y-2">
                {events.map((e) => (
                  <li
                    key={e.time}
                    className={`rounded-lg border px-3 py-2.5 text-[13px] ${
                      e.tone === "alert"
                        ? "border-alert/50 bg-alert/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <p className="flex justify-between">
                      <span className={`font-semibold ${e.tone === "alert" ? "text-alert" : "text-white"}`}>
                        {e.title}
                      </span>
                      <span className="tnum text-haze">{e.time}</span>
                    </p>
                    <p className="mt-0.5 text-haze">{e.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="w-[260px] rounded-[2.25rem] border border-white/15 bg-[#050b1c] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
      <div className="overflow-hidden rounded-[1.75rem] bg-paper text-ink">
        <div className="flex justify-center pt-2">
          <span className="h-1.5 w-16 rounded-full bg-ink/80" />
        </div>
        {/* push */}
        <div className="m-3 rounded-2xl bg-white p-3 shadow-sm">
          <p className="flex items-center gap-1.5 text-[11px] text-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark.png" alt="" className="size-3.5" />
            XROSS <span className="ml-auto">방금</span>
          </p>
          <p className="mt-1 text-[13px] font-semibold">미결제 의심 상황이 감지되었습니다</p>
          <p className="text-[12px] text-muted">1호점 고객 A, 선택 3개 중 2개 결제</p>
        </div>
        {/* event detail */}
        <div className="mx-3 mb-3 rounded-2xl bg-white p-3 text-[12px]">
          <p className="text-[13px] font-semibold">이벤트 상세</p>
          <div className="relative mt-2 overflow-hidden rounded-lg">
            <CamFeed name="CAM 2" box />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-8 place-items-center rounded-full bg-white/90">
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M3 1.5v9l7.5-4.5z" fill="#081229" />
                </svg>
              </span>
            </span>
          </div>
          <dl className="tnum mt-2.5 space-y-1">
            <div className="flex justify-between">
              <dt className="text-muted">발생 시각</dt>
              <dd>22:41:08</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">선택 상품</dt>
              <dd>{picked.length}개 {won(picked.reduce((a, b) => a + b.price, 0))}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">결제 내역</dt>
              <dd>{paid.length}개 {won(paid.reduce((a, b) => a + b.price, 0))}</dd>
            </div>
            <div className="flex justify-between font-semibold text-[#9a5b00]">
              <dt>차이</dt>
              <dd>딸기 컵 1개</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">매장 방송</dt>
              <dd>경고 방송 송출됨</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

const captions = [
  { title: "웹 관제 화면", body: "매장 카메라와 오늘의 주요 이벤트를 한 화면에서 확인합니다." },
  { title: "실시간 알림", body: "미결제 의심 상황이 감지되면 바로 알림이 도착하고, 매장에 경고 방송이 나갔는지도 함께 표시됩니다." },
  { title: "이벤트 상세 화면", body: "발생 시각, 선택 상품과 결제 정보, 관련 영상을 함께 봅니다." },
  { title: "모바일 화면", body: "매장 밖에서도 알림을 받고 상황을 확인할 수 있습니다." },
];

export default function DashboardPreview() {
  return (
    <section id="preview" className="overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="wrap">
        <h2 className="h-section">
          어디서든,
          <br />
          매장 상황을 한눈에.
        </h2>

        <div className="relative mt-14 lg:pr-60">
          <WebMock />
          <div className="mt-8 flex justify-center lg:absolute lg:-bottom-12 lg:right-0 lg:mt-0">
            <PhoneMock />
          </div>
        </div>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {captions.map((c) => (
            <li key={c.title} className="border-t border-ink-3 pt-5">
              <h3 className="font-bold tracking-[-0.02em]">{c.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-haze">{c.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-haze/80">
          화면은 이해를 돕기 위한 예시이며, 실제 서비스 화면과 다를 수 있습니다.
        </p>
      </div>
    </section>
  );
}
