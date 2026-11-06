const worries = [
  {
    when: "영업 마감 후 매출을 정산할 때",
    quote: "혹시 물건을 가져가고 결제하지 않은 건 아닐까?",
    body: "고객이 어떤 상품을 골랐고 실제로 결제했는지, 점주가 매번 맞춰 보기는 어렵습니다.",
  },
  {
    when: "재고가 맞지 않는다는 걸 알았을 때",
    quote: "문제가 생긴 것 같은데, 언제부터 영상을 봐야 하지?",
    body: "상황을 확인하려면 녹화된 영상을 처음부터 직접 찾아봐야 합니다.",
  },
  {
    when: "다른 일정으로 매장을 비울 때",
    quote: "매장에 직접 가지 않고도 상황을 확인할 수 없을까?",
    body: "원격 운영이 가능하더라도, 실제 상황을 확인하는 데는 여전히 점주의 시간과 노력이 듭니다.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-paper py-24 md:py-32">
      <div className="wrap">
        <h2 className="h-section max-w-2xl">
          매장에 없을 때,
          <br />
          가장 걱정되는 순간은 언제인가요?
        </h2>

        <ul className="mt-14 border-t border-line">
          {worries.map((w) => (
            <li
              key={w.quote}
              className="grid gap-3 border-b border-line py-9 md:grid-cols-[1.4fr_1fr] md:gap-12 md:py-11"
            >
              <div>
                <p className="text-[0.9375rem] text-muted">{w.when}</p>
                <p className="mt-2 text-[clamp(1.375rem,1rem+1.4vw,1.875rem)] font-semibold leading-[1.4] tracking-[-0.025em]">
                  “{w.quote}”
                </p>
              </div>
              <p className="self-end leading-[1.75] text-muted md:pb-1">{w.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-[clamp(1.25rem,1rem+1vw,1.625rem)] font-semibold leading-[1.5] tracking-[-0.02em] text-signal">
          이제는 기록만 하는 CCTV를 넘어,
          <br />
          상황을 먼저 알려주는 관리가 필요합니다.
        </p>
      </div>
    </section>
  );
}
