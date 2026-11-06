const sources = [
  { label: "AI 카메라", sub: "고객 동선과 상품 선택 행동" },
  { label: "무게 센서", sub: "진열대 상품의 실제 변화" },
  { label: "POS 결제", sub: "실제 결제된 상품과 금액" },
];

const outputs = [
  { label: "점주 알림", sub: "웹·모바일로 상황과 영상 확인", y: 95, color: "#ffb547" },
  { label: "매장 내 경고 방송", sub: "현장의 고객에게 결제 안내", y: 205, color: "#3aa8ff" },
];

const steps = [
  {
    title: "감지합니다",
    body: "AI가 고객의 움직임과 상품 선택 행동을 분석합니다.",
  },
  {
    title: "교차검증합니다",
    body: "무게 센서와 실제 결제 정보를 함께 비교해 미결제 의심 상황을 판단합니다.",
  },
  {
    title: "알려드립니다",
    body: "의심 상황이 발생하면 점주에게 알림을 전달하고, 매장 안에서는 경고 방송으로 고객에게 바로 결제를 안내합니다.",
  },
];

function Diagram() {
  const ys = [50, 150, 250];
  return (
    <svg
      viewBox="0 0 820 300"
      className="hidden w-full md:block"
      role="img"
      aria-label="AI 카메라, 무게 센서, POS 결제 정보가 XROSS에서 하나로 모여 점주 알림과 매장 내 경고 방송으로 이어집니다."
    >
      {ys.map((y, i) => (
        <g key={i}>
          <path
            d={`M220 ${y} C 300 ${y}, 300 150, 370 150`}
            fill="none"
            stroke="#3aa8ff"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <path
            className="anim-flow"
            d={`M220 ${y} C 300 ${y}, 300 150, 370 150`}
            fill="none"
            stroke="#3aa8ff"
            strokeWidth="2"
            strokeDasharray="2 22"
            strokeLinecap="round"
          />
          <rect x="0" y={y - 34} width="220" height="68" rx="12" fill="#0e1c3d" stroke="#1a2b57" />
          <text x="22" y={y - 4} fontSize="17" fontWeight="650" fill="#fff">
            {sources[i].label}
          </text>
          <text x="22" y={y + 18} fontSize="13" fill="#9aa8c7">
            {sources[i].sub}
          </text>
        </g>
      ))}

      {/* XROSS core */}
      <circle cx="430" cy="150" r="78" fill="#1f5bff" fillOpacity="0.08" />
      <circle cx="430" cy="150" r="60" fill="#0e1c3d" stroke="#1f5bff" strokeWidth="1.5" />
      <image href="/mark.png" x="400" y="120" width="60" height="60" />

      {outputs.map((o) => {
        const d = `M490 150 C 540 150, 540 ${o.y}, 590 ${o.y}`;
        return (
          <g key={o.label}>
            <path d={d} fill="none" stroke={o.color} strokeOpacity="0.5" strokeWidth="1.5" />
            <path
              className="anim-flow"
              d={d}
              fill="none"
              stroke={o.color}
              strokeWidth="2"
              strokeDasharray="2 22"
              strokeLinecap="round"
            />
            <rect x="590" y={o.y - 40} width="230" height="80" rx="12" fill="#0e1c3d" stroke={o.color} strokeOpacity="0.6" />
            <text x="612" y={o.y - 6} fontSize="16" fontWeight="650" fill="#fff">
              {o.label}
            </text>
            <text x="612" y={o.y + 17} fontSize="13" fill="#9aa8c7">
              {o.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DiagramMobile() {
  return (
    <div className="md:hidden">
      <ul className="grid gap-2">
        {sources.map((s) => (
          <li key={s.label} className="rounded-xl border border-ink-3 bg-ink-2 px-4 py-3">
            <p className="font-semibold text-white">{s.label}</p>
            <p className="text-sm text-haze">{s.sub}</p>
          </li>
        ))}
      </ul>
      <div className="my-3 flex justify-center" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/mark.png" alt="" className="size-12" />
      </div>
      <ul className="grid gap-2">
        {outputs.map((o) => (
          <li
            key={o.label}
            className="rounded-xl border bg-ink-2 px-4 py-3"
            style={{ borderColor: `${o.color}99` }}
          >
            <p className="font-semibold text-white">{o.label}</p>
            <p className="text-sm text-haze">{o.sub}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Solution() {
  return (
    <section id="solution" className="bg-ink py-24 text-white md:py-32">
      <div className="wrap">
        <h2 className="h-section">XROSS는 보고, 확인하고, 알려줍니다.</h2>
        <p className="lede mt-5 text-haze">
          카메라 영상, 진열대의 무게 변화, 결제 내역을 하나로 모아 비교합니다.
          점주가 직접 맞춰 보던 일을 XROSS가 대신하고, 필요한 순간에는 매장
          안에서 바로 안내합니다.
        </p>

        <div className="mt-14">
          <Diagram />
          <DiagramMobile />
        </div>

        <ol className="mt-16 grid gap-10 border-t border-ink-3 pt-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.title}>
              <p className="tnum text-sm font-semibold text-sky">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-bold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 leading-[1.75] text-haze">{s.body}</p>
            </li>
          ))}
        </ol>

        <blockquote className="mt-16 rounded-2xl bg-gradient-to-r from-signal to-violet px-7 py-8 md:px-10 md:py-10">
          <p className="text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-[1.5] tracking-[-0.02em]">
            영상만으로 판단하지 않습니다.
            <br />
            상품의 실제 변화와 결제 내역까지 함께 확인합니다.
          </p>
        </blockquote>
      </div>
    </section>
  );
}
