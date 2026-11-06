import HeroVisual from "./HeroVisual";

const keywords = [
  "AI 영상 분석",
  "무게 센서",
  "POS 결제 연동",
  "점주 실시간 알림",
  "매장 내 경고 방송",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink pt-16 text-white"
    >
      {/* slowly drifting gradient glow in the logo colors */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-blob hero-blob-a" />
        <div className="hero-blob hero-blob-b" />
        <div className="hero-blob hero-blob-c" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-ink)_100%)]" />
      </div>

      <div className="wrap relative grid items-center gap-14 py-14 md:py-16 lg:grid-cols-[1fr_1.12fr] lg:gap-10">
        <div>
          <h1 className="text-[clamp(2.25rem,1rem+3.4vw,3.375rem)] font-[760] leading-[1.22] tracking-[-0.035em]">
            사장님이 없는 순간에도,
            <br />
            매장 관리는 계속되어야
            <br className="hidden lg:block" /> 하니까.
          </h1>
          <p className="mt-7 max-w-[30rem] text-lg leading-[1.75] text-haze">
            미결제 의심 상황을 감지하면 점주에게 실시간으로 알리고,
            매장 안에서는 경고 방송으로 바로 안내합니다.{" "}
            <br className="hidden sm:block" />
            AI 기반 무인매장 관제 솔루션, XROSS.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              도입 상담 신청하기
            </a>
            <a href="#how" className="btn btn-ghost-dark">
              서비스 살펴보기
            </a>
          </div>
          <ul className="mt-10 grid max-w-[24rem] grid-cols-2 gap-x-6 gap-y-3 text-[0.9375rem] text-haze">
            {keywords.map((k) => (
              <li key={k} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden className="shrink-0">
                  <path d="M3 8.5l3 3 7-7" stroke="#3aa8ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {k}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
