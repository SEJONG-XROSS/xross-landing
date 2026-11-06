import LogoReveal from "./LogoReveal";

const nav = [
  { href: "#problem", label: "왜 필요한가요" },
  { href: "#solution", label: "솔루션" },
  { href: "#how", label: "작동 방식" },
  { href: "#features", label: "기능" },
  { href: "#faq", label: "자주 묻는 질문" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a href="#top" className="shrink-0 justify-self-start" aria-label="XROSS 홈">
          <LogoReveal />
        </a>
        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] text-haze">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="btn btn-primary h-10 justify-self-end px-4 text-[0.9375rem]">
          도입 상담 신청하기
        </a>
      </div>
    </header>
  );
}
