"use client";

import { useEffect, useState } from "react";
import LogoReveal from "./LogoReveal";

const nav = [
  { href: "#problem", label: "왜 필요한가요" },
  { href: "#solution", label: "솔루션" },
  { href: "#how", label: "작동 방식" },
  { href: "#features", label: "기능" },
  { href: "#faq", label: "자주 묻는 질문" },
];

const THRESHOLD = 24;

/**
 * 맨 위에서는 히어로와 섞이는 투명 헤더 + X 심볼만,
 * 스크롤을 내리면 흰 배경으로 바뀌며 ROSS 글자가 펼쳐집니다.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > THRESHOLD);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none ${
        scrolled
          ? "border-line bg-white shadow-[0_6px_20px_-12px_rgba(8,18,41,0.18)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a href="#top" className="shrink-0 justify-self-start" aria-label="XROSS 홈">
          <LogoReveal open={scrolled} />
        </a>
        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul
            className={`flex items-center gap-8 text-[0.9375rem] font-medium transition-colors duration-300 ${
              scrolled ? "text-muted" : "text-white/75"
            }`}
          >
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`transition-colors ${scrolled ? "hover:text-ink" : "hover:text-white"}`}
                >
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
