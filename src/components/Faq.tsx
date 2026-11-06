const faqs = [
  {
    q: "어떤 매장에서 사용할 수 있나요?",
    a: "무인 아이스크림 판매점과 무인 소매점 등 셀프 결제 기반 무인매장을 주요 대상으로 합니다. 실제 도입 가능 여부는 매장 환경과 설비 구성에 따라 확인이 필요합니다.",
  },
  {
    q: "기존 CCTV를 그대로 사용할 수 있나요?",
    a: "카메라의 설치 위치와 영상 접근 방식 등 매장 환경에 따라 달라질 수 있습니다. 상담을 통해 적합성을 확인합니다.",
  },
  {
    q: "별도의 장비 설치가 필요한가요?",
    a: "XROSS는 카메라, 무게 센서, 결제 데이터의 연동을 활용합니다. 필요한 장비와 설치 범위는 매장 환경에 따라 안내합니다.",
  },
  {
    q: "매장에 없어도 알림을 받을 수 있나요?",
    a: "XROSS는 웹·모바일 기반의 실시간 알림 기능을 제공하도록 설계되었습니다. 실제 도입 환경에 따른 기능 제공 범위는 상담 시 안내합니다.",
  },
  {
    q: "매장 내 경고 방송은 어떻게 이루어지나요?",
    a: "미결제 의심 상황이 감지되면 매장 안에 결제를 안내하는 경고 방송을 내보내, 고객이 그 자리에서 결제를 마칠 수 있도록 돕습니다. 방송에 필요한 장비와 연동 방식은 매장 환경에 따라 상담 시 안내합니다.",
  },
  {
    q: "도입 비용은 얼마인가요?",
    a: "비용 및 이용 조건은 사업화 과정에서 확정할 예정이며, 상담을 통해 관련 내용을 안내합니다.",
  },
  {
    q: "시범 도입이 가능한가요?",
    a: "시범 도입 가능 여부와 일정은 신청 매장의 환경 및 운영 계획에 따라 개별적으로 안내합니다.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="h-section">XROSS 도입이 궁금하신가요?</h2>
          <p className="mt-5 leading-[1.75] text-muted">
            여기에 없는 내용은 문의를 남겨 주시면 매장 환경에 맞춰 안내해 드립니다.
          </p>
          <a href="#contact" className="btn btn-ghost-light mt-8">
            궁금한 점 문의하기
          </a>
        </div>

        <div className="border-t border-ink">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  aria-hidden
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="-mt-1 pb-7 pr-10 leading-[1.8] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
