"use client";

import { useEffect, useRef, useState } from "react";
import { broadcastMessage, paid, picked, won } from "@/lib/scenario";
import SpeakerIcon from "./SpeakerIcon";

const steps = [
  {
    title: "고객 입장",
    body: "고객이 매장에 입장하면 AI 카메라가 고객을 인식하고 이동을 추적합니다.",
  },
  {
    title: "상품 선택",
    body: "고객이 상품을 선택하거나 반환하면 영상 분석과 무게 변화를 통해 상품 선택 여부를 확인합니다.",
  },
  {
    title: "장바구니 구성",
    body: "선택한 상품과 수량이 고객별 가상 장바구니에 반영됩니다.",
  },
  {
    title: "결제 확인",
    body: "실제 POS 결제 내역과 가상 장바구니를 비교합니다.",
  },
  {
    title: "알림과 경고 방송",
    body: "결제가 일치하지 않거나 미결제 퇴장이 의심되면 점주에게 알림을 전달하고, 매장 안에는 결제를 안내하는 경고 방송을 내보냅니다.",
  },
];

const positions = [
  [44, 128],
  [150, 56],
  [196, 84],
  [262, 104],
  [44, 140],
] as const;

const HEADER_H = 64;
const SCROLL_PER_STEP_VH = 60;

function StepRail({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div>
      <p className="tnum text-sm font-semibold text-muted">
        <span className="text-signal">{active + 1}단계</span> / {steps.length}단계
      </p>
      <ol className="mt-7">
        {steps.map((st, i) => (
          <li key={st.title} className="relative pb-7 pl-12 last:pb-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={`absolute bottom-0 left-[15px] top-9 w-0.5 rounded-full transition-colors duration-300 ${
                  i < active ? "bg-signal" : "bg-line"
                }`}
              />
            )}
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={active === i ? "step" : undefined}
              className="group block cursor-pointer text-left"
            >
              <span
                className={`tnum absolute left-0 top-0 grid size-8 place-items-center rounded-full text-sm font-bold transition-colors duration-300 ${
                  i <= active
                    ? "bg-signal text-white"
                    : "bg-white text-muted ring-1 ring-line group-hover:text-signal group-hover:ring-signal"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`block pt-0.5 text-xl font-bold tracking-[-0.02em] transition-colors duration-300 ${
                  i === active ? "text-ink" : "text-muted/60 group-hover:text-ink"
                }`}
              >
                {st.title}
              </span>
              <span
                className={`grid transition-[grid-template-rows] duration-300 ${
                  i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <span className="overflow-hidden">
                  <span className="block max-w-md pt-2 text-[1.0625rem] leading-[1.75] text-muted">
                    {st.body}
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Panel({ s }: { s: number }) {
  const [x, y] = positions[s];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_60px_-30px_rgba(8,18,41,0.25)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 text-sm">
        <span className="font-semibold">무인 아이스크림 1호점</span>
        <span className="text-muted">고객 A</span>
      </div>

      <svg viewBox="0 0 320 160" className="block w-full bg-paper" aria-hidden>
        <rect x="6" y="6" width="308" height="148" rx="6" fill="#fff" stroke="#dce3f0" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={24 + i * 82}
            y="16"
            width="72"
            height="24"
            rx="3"
            fill={s >= 1 && i === 1 ? "#1f5bff1a" : "#f2f5fb"}
            stroke={s >= 1 && i === 1 ? "#1f5bff" : "#dce3f0"}
            style={{ transition: "all 300ms" }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <text key={i} x={60 + i * 82} y="32" textAnchor="middle" fontSize="9" fill="#56627d">
            냉동고 {i + 1}
          </text>
        ))}
        <rect x="250" y="112" width="44" height="32" rx="3" fill="#f2f5fb" stroke="#dce3f0" />
        <text x="272" y="131" textAnchor="middle" fontSize="9" fill="#56627d">키오스크</text>
        <line x1="22" y1="154" x2="66" y2="154" stroke="#fff" strokeWidth="4" />
        <text x="72" y="149" fontSize="9" fill="#56627d">출입구</text>
        {/* in-store speaker */}
        <g transform="translate(14 84)">
          <path
            d="M0 5h4l5-4v15l-5-4H0z"
            fill={s === 4 ? "#1f5bff" : "#dce3f0"}
            style={{ transition: "fill 300ms" }}
          />
          {s === 4 && (
            <g fill="none" stroke="#1f5bff" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12.5 5a4.5 4.5 0 0 1 0 7" />
              <path d="M16 2a9 9 0 0 1 0 13" />
            </g>
          )}
        </g>
        <g
          style={{
            transform: `translate(${x}px, ${y}px)`,
            transition: "transform 600ms cubic-bezier(0.45,0,0.3,1)",
          }}
        >
          <circle r="12" fill="#1f5bff" fillOpacity="0.14" />
          <circle r="6" fill="#1f5bff" stroke="#fff" strokeWidth="1.5" />
          <text y="-15" textAnchor="middle" fontSize="9" fontWeight="600" fill="#081229">
            {s === 4 ? "출입구로 이동" : "고객 A"}
          </text>
        </g>
        {s >= 1 && (
          <g>
            <rect x="174" y="44" width="62" height="17" rx="8.5" fill="#1f5bff" />
            <text x="205" y="55.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
              무게 −3개
            </text>
          </g>
        )}
      </svg>

      <div className="grid min-h-[8.75rem] grid-cols-2 divide-x divide-line border-t border-line text-sm">
        <div className="p-4">
          <p className="mb-2 flex justify-between text-xs text-muted">
            <span>가상 장바구니</span>
            <span className="tnum">{s >= 2 ? "3개" : ""}</span>
          </p>
          {s >= 2 ? (
            <ul className="tnum space-y-1.5">
              {picked.map((p, i) => (
                <li
                  key={p.name}
                  className={`flex justify-between rounded px-1.5 py-0.5 ${
                    s >= 3 && i === 2 ? "bg-alert/20" : ""
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="text-muted">{won(p.price)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">{s === 1 ? "상품 확인 중" : "비어 있음"}</p>
          )}
        </div>
        <div className="p-4">
          <p className="mb-2 flex justify-between text-xs text-muted">
            <span>POS 결제 내역</span>
            <span className="tnum">{s >= 3 ? "2개" : ""}</span>
          </p>
          {s >= 3 ? (
            <ul className="tnum space-y-1.5">
              {paid.map((p) => (
                <li key={p.name} className="flex justify-between px-1.5 py-0.5">
                  <span>{p.name}</span>
                  <span className="text-muted">{won(p.price)}</span>
                </li>
              ))}
              <li className="flex justify-between rounded bg-alert/20 px-1.5 py-0.5 font-semibold text-[#9a5b00]">
                <span>딸기 컵</span>
                <span>없음</span>
              </li>
            </ul>
          ) : (
            <p className="text-muted">결제 전</p>
          )}
        </div>
      </div>

      <div
        className={`flex min-h-[4.5rem] items-center gap-3 border-t px-5 py-4 transition-colors duration-300 ${
          s === 4 ? "border-alert/50 bg-alert/15" : "border-line bg-white"
        }`}
        aria-live="polite"
      >
        {s === 4 ? (
          <>
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-alert text-sm font-bold text-ink">
              !
            </span>
            <p className="text-sm leading-snug">
              <span className="font-semibold">점주에게 미결제 의심 알림을 보냈습니다.</span>
              <br />
              <span className="text-muted">딸기 컵 1개({won(picked[2].price)}) 결제가 확인되지 않았습니다.</span>
            </p>
          </>
        ) : (
          <p className="text-sm text-muted">
            {s === 3 ? "장바구니와 결제 내역을 비교하는 중" : "이상 없음"}
          </p>
        )}
      </div>
      <div className="flex min-h-[4.5rem] items-center gap-3 border-t border-line bg-white px-5 py-4">
        <span
          className={`grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
            s === 4 ? "bg-signal/10 text-signal" : "bg-paper text-muted/60"
          }`}
        >
          <SpeakerIcon size={16} />
        </span>
        {s === 4 ? (
          <p className="text-sm leading-snug">
            <span className="font-semibold">매장 내 경고 방송</span>
            <br />
            <span className="text-muted">“{broadcastMessage}”</span>
          </p>
        ) : (
          <p className="text-sm text-muted">매장 내 경고 방송 대기</p>
        )}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  // desktop: the stage is pinned under the header; scroll progress through it picks the step
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = stageRef.current;
      if (!el || !mq.matches) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - (window.innerHeight - HEADER_H);
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, (HEADER_H - rect.top) / scrollable));
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mq.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", schedule);
    };
  }, []);

  // clicking a step scrolls to the middle of that step's scroll range
  const goTo = (i: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = rect.height - (window.innerHeight - HEADER_H);
    const top = rect.top + window.scrollY - HEADER_H + scrollable * ((i + 0.5) / steps.length);
    window.scrollTo({ top });
  };

  return (
    <section id="how" className="bg-paper py-24 md:py-32">
      <div className="wrap">
        <h2 className="h-section">
          고객이 상품을 고르는 순간부터,
          <br />
          결제를 마칠 때까지.
        </h2>
        <p className="lede mt-5 text-muted">
          아이스크림 3개를 고른 고객이 2개만 결제하고 나간 상황을 예로,
          XROSS가 어떻게 차이를 찾아 알려드리는지 보여드립니다.
        </p>

        {/* mobile / tablet: tabbed */}
        <div className="mt-12 lg:hidden">
          <div role="tablist" aria-label="작동 단계" className="mb-4 grid grid-cols-5 gap-1.5">
            {steps.map((st, i) => (
              <button
                key={st.title}
                role="tab"
                aria-selected={active === i}
                aria-controls="how-panel"
                onClick={() => setActive(i)}
                className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                  active === i ? "bg-ink text-white" : "bg-white text-muted"
                }`}
              >
                <span className="sr-only">{st.title} </span>
                {i + 1}
              </button>
            ))}
          </div>
          <div id="how-panel" role="tabpanel">
            <p className="text-sm font-semibold text-signal">{active + 1}단계</p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.02em]">{steps[active].title}</h3>
            <p className="mb-5 mt-2 leading-[1.75] text-muted">{steps[active].body}</p>
            <Panel s={active} />
          </div>
        </div>

        {/* desktop: pinned stage, steps advance in place as you scroll */}
        <div
          ref={stageRef}
          className="relative mt-4 hidden lg:block"
          style={{ height: `calc(${steps.length * SCROLL_PER_STEP_VH}vh + 100vh - ${HEADER_H}px)` }}
        >
          <div
            className="sticky flex items-center"
            style={{ top: HEADER_H, height: `calc(100vh - ${HEADER_H}px)` }}
          >
            <div className="grid w-full grid-cols-[1fr_1.1fr] items-center gap-16">
              <div className="self-start pt-6">
                <StepRail active={active} onSelect={goTo} />
              </div>
              <Panel s={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
