import type { ReactNode } from "react";
import SpeakerIcon from "./SpeakerIcon";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="text-signal"
  >
    {children}
  </svg>
);

type Feature = {
  title: string;
  body: string;
  helps: string;
  icon: ReactNode;
};

// 기능을 Solution 섹션과 같은 흐름(감지 → 교차검증 → 알림·대응)으로 묶어 보여줍니다.
const stages: { title: string; caption: string; features: Feature[] }[] = [
  {
    title: "지켜보고 감지합니다",
    caption: "매장 영상을 분석해 고객의 행동을 파악합니다.",
    features: [
      {
        title: "실시간 매장 모니터링",
        body: "매장의 주요 상황을 웹 기반 관제 화면에서 확인할 수 있습니다.",
        helps: "매장에 가지 않고도 지금 상황을 확인",
        icon: (
          <Icon>
            <rect x="3" y="4" width="18" height="13" rx="2" />
            <path d="M8 21h8M12 17v4" />
            <circle cx="12" cy="10.5" r="2.5" />
          </Icon>
        ),
      },
      {
        title: "이상행동 감지",
        body: "장기 체류와 낙상 등 매장 내 이상행동 후보를 감지하여 점주의 확인을 지원합니다.",
        helps: "결제 외의 매장 안전도 함께 확인",
        icon: (
          <Icon>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </Icon>
        ),
      },
    ],
  },
  {
    title: "결제와 교차검증합니다",
    caption: "고른 상품과 실제 결제 내역을 맞춰 봅니다.",
    features: [
      {
        title: "AI 기반 상품 선택 감지",
        body: "고객의 상품 선택과 반환 행동을 분석하고 센서 데이터로 교차검증합니다.",
        helps: "어떤 상품이 빠졌는지 따로 세지 않아도 됨",
        icon: (
          <Icon>
            <path d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.7h-9a2 2 0 0 1-2-1.7z" />
            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
            <path d="M9.5 13l2 2 3.5-3.5" />
          </Icon>
        ),
      },
      {
        title: "미결제 의심 상황 감지",
        body: "실제 결제 내역과 선택한 상품 정보를 비교하여 미결제 의심 상황을 확인합니다.",
        helps: "정산 때 맞춰 보던 일을 그때그때 확인",
        icon: (
          <Icon>
            <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
            <path d="M9 8h6M9 12h3" />
            <path d="M14.5 14.5l3 3M17.5 14.5l-3 3" />
          </Icon>
        ),
      },
    ],
  },
  {
    title: "알리고 대응합니다",
    caption: "점주와 매장 양쪽에서 바로 대응할 수 있게 합니다.",
    features: [
      {
        title: "점주 실시간 알림",
        body: "주요 이벤트가 발생하면 웹과 모바일을 통해 관련 알림을 전달합니다.",
        helps: "CCTV를 계속 지켜보지 않아도 됨",
        icon: (
          <Icon>
            <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
            <path d="M10 20.5a2 2 0 0 0 4 0" />
          </Icon>
        ),
      },
      {
        title: "매장 내 경고 방송",
        body: "미결제 의심 상황이 감지되면 매장 안에 경고 방송을 내보내, 고객이 그 자리에서 결제를 마칠 수 있도록 안내합니다.",
        helps: "점주가 없어도 현장에서 바로 대응",
        icon: <SpeakerIcon size={26} className="text-signal" />,
      },
      {
        title: "이벤트 영상 확인",
        body: "의심 상황이 발생한 시간과 관련 영상 구간을 연결하여 쉽게 확인할 수 있도록 지원합니다.",
        helps: "영상을 처음부터 돌려 볼 필요가 없음",
        icon: (
          <Icon>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M10 9.5v5l4-2.5z" />
          </Icon>
        ),
      },
    ],
  },
];

function Helps({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 flex items-start gap-2 text-[0.9375rem] font-semibold text-signal">
      <svg width="16" height="16" viewBox="0 0 16 16" className="mt-1 shrink-0" aria-hidden>
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </p>
  );
}

const cols: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 md:py-32">
      <div className="wrap">
        <h2 className="h-section">
          무인매장 관리에 필요한 기능을,
          <br />
          하나로 연결했습니다.
        </h2>
        <p className="lede mt-5 text-muted">
          매장을 지켜보는 일부터 결제 확인, 알림과 현장 대응까지 하나의 흐름으로
          이어집니다.
        </p>

        <ol className="mt-14">
          {stages.map((stage, si) => {
            const last = si === stages.length - 1;
            return (
              <li
                key={stage.title}
                className="relative grid gap-5 pb-12 pl-14 last:pb-0 lg:grid-cols-[16rem_1fr] lg:gap-8 lg:pl-0"
              >
                {/* connector rail */}
                {!last && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[19px] top-12 w-0.5 bg-gradient-to-b from-signal to-signal/30"
                  />
                )}
                {!last && (
                  <svg
                    aria-hidden
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    className="absolute -bottom-1 left-[13px] text-signal/60"
                  >
                    <path d="M1 1l6 7 6-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}

                <div className="lg:relative lg:pl-14">
                  <span className="tnum absolute left-0 top-0 grid size-10 place-items-center rounded-full bg-signal text-[0.9375rem] font-bold text-white">
                    {si + 1}
                  </span>
                  <h3 className="pt-1.5 text-xl font-bold tracking-[-0.02em]">{stage.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-muted">{stage.caption}</p>
                </div>

                <ul
                  className={`grid gap-px overflow-hidden rounded-2xl border border-line bg-line ${cols[stage.features.length]}`}
                >
                  {stage.features.map((f) => (
                    <li key={f.title} className="bg-white p-6 md:p-7">
                      {f.icon}
                      <h4 className="mt-4 text-lg font-bold tracking-[-0.02em]">{f.title}</h4>
                      <p className="mt-2 leading-[1.75] text-muted">{f.body}</p>
                      <Helps>{f.helps}</Helps>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-paper px-7 py-8 md:flex-row md:items-center md:px-10">
          <p className="text-lg font-semibold tracking-[-0.02em]">
            우리 매장에는 어떤 구성이 맞을지 궁금하다면
          </p>
          <a href="#contact" className="btn btn-primary">
            XROSS 도입 알아보기
          </a>
        </div>
      </div>
    </section>
  );
}
