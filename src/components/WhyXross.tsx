const rows = [
  ["매장 상황 기록", "영상 녹화", "영상 기반 분석 및 관제"],
  ["상품 선택 확인", "점주가 직접 영상 확인", "AI·센서 기반 감지"],
  ["결제 여부 확인", "거래 내역을 별도로 확인", "상품 선택 정보와 POS 결제 비교"],
  ["의심 상황 인지", "점주의 확인에 의존", "주요 의심 상황 알림"],
  ["현장 대응", "점주가 나중에 확인한 뒤 대응", "매장 내 경고 방송으로 바로 결제 안내"],
  ["사후 상황 확인", "해당 영상 직접 검색", "이벤트 연계 영상 복기"],
];

type Step = { text: string; owner?: boolean; auto?: string };

const flows: {
  name: string;
  ownerSteps: number;
  strong?: boolean;
  steps: Step[];
}[] = [
  {
    name: "일반 CCTV",
    ownerSteps: 3,
    steps: [
      { text: "CCTV 녹화" },
      { text: "이상한 점 직접 발견", owner: true },
      { text: "영상 처음부터 검색", owner: true },
      { text: "상황 파악 후 대응", owner: true },
    ],
  },
  {
    name: "XROSS",
    ownerSteps: 1,
    strong: true,
    steps: [
      { text: "XROSS가 자동으로", auto: "감지, 교차검증, 알림, 경고 방송" },
      { text: "알림 받고 영상 확인", owner: true },
    ],
  },
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden className="shrink-0">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <circle cx="8" cy="5" r="3" fill="currentColor" />
      <path d="M2.5 14.5a5.5 5.5 0 0 1 11 0z" fill="currentColor" />
    </svg>
  );
}

function Arrow({ strong }: { strong?: boolean }) {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden className={`shrink-0 ${strong ? "text-signal" : "text-muted/40"}`}>
      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function Flow({ steps, strong }: { steps: Step[]; strong?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.9375rem]">
      {steps.map((st, i) => (
        <li key={st.text} className="flex items-center gap-2">
          {st.auto ? (
            <span className="flex flex-wrap items-baseline gap-x-2 rounded-full bg-signal px-4 py-1.5 text-white">
              <span className="font-semibold">{st.text}</span>
              <span className="text-sm text-white/75">{st.auto}</span>
            </span>
          ) : st.owner ? (
            <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-semibold text-ink ring-1 ring-ink/20">
              <PersonIcon />
              <span className="sr-only">점주: </span>
              {st.text}
            </span>
          ) : (
            <span className="rounded-full border border-dashed border-muted/40 px-3.5 py-1.5 text-muted">
              {st.text}
            </span>
          )}
          {i < steps.length - 1 && <Arrow strong={strong} />}
        </li>
      ))}
    </ol>
  );
}

export default function WhyXross() {
  return (
    <section id="why" className="bg-paper py-24 md:py-32">
      <div className="wrap">
        <h2 className="h-section">
          단순한 감시를 넘어,
          <br />
          매장 상황을 이해하는 관제.
        </h2>
        <p className="lede mt-5 text-muted">
          XROSS는 CCTV를 대체하는 것이 아니라, 카메라 영상에 센서와 결제 데이터를
          더해 점주가 매장 상황을 더 쉽게 확인하도록 돕습니다.
        </p>

        <div className="mt-12 border-t border-line">
          {flows.map((f) => (
            <div
              key={f.name}
              className="grid gap-4 border-b border-line py-6 md:grid-cols-[12rem_1fr] md:items-center md:gap-8"
            >
              <div>
                <p className={`font-bold ${f.strong ? "text-signal" : "text-muted"}`}>{f.name}</p>
                <p className="mt-0.5 text-sm text-muted">
                  점주가 할 일{" "}
                  <span className={`tnum text-base font-bold ${f.strong ? "text-signal" : "text-ink"}`}>
                    {f.ownerSteps}단계
                  </span>
                </p>
              </div>
              <Flow steps={f.steps} strong={f.strong} />
            </div>
          ))}
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
            <PersonIcon />
            점주가 직접 하는 일
          </p>
        </div>

        <ul className="mt-12 space-y-3 md:hidden">
          {rows.map(([k, a, b]) => (
            <li key={k} className="rounded-xl border border-line bg-white p-5">
              <p className="font-semibold">{k}</p>
              <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 text-[0.9375rem]">
                <dt className="text-muted">CCTV</dt>
                <dd className="text-muted">{a}</dd>
                <dt className="font-semibold text-signal">XROSS</dt>
                <dd className="flex items-start gap-1.5 font-semibold text-signal">
                  <span className="mt-[3px]">
                    <CheckIcon />
                  </span>
                  {b}
                </dd>
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-14 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">일반 CCTV와 XROSS 비교</caption>
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="w-[24%] py-4 pr-4 font-semibold text-muted">비교 항목</th>
                <th scope="col" className="w-[34%] px-4 py-4 font-semibold text-muted">일반 CCTV</th>
                <th scope="col" className="rounded-t-xl bg-ink px-5 py-4 font-semibold text-white">XROSS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, a, b], i) => (
                <tr key={k} className="border-b border-line">
                  <th scope="row" className="py-5 pr-4 font-semibold">{k}</th>
                  <td className="px-4 py-5 text-muted">{a}</td>
                  <td
                    className={`bg-white px-5 py-5 font-semibold text-signal ring-1 ring-inset ring-line ${
                      i === rows.length - 1 ? "rounded-b-xl" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <CheckIcon />
                      {b}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
