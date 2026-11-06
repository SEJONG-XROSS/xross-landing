"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// 로고 원본(783×120)을 심볼(0–178px)과 ROSS(178–783px)로 나눈 이미지. h-6(24px) 기준 너비.
const HEIGHT = 24;
const MARK_W = (178 / 120) * HEIGHT;
const ROSS_W = (605 / 120) * HEIGHT;
const THRESHOLD = 24;

/** 처음엔 X 심볼만, 스크롤을 내리면 ROSS 글자가 펼쳐지는 로고 */
export default function LogoReveal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setOpen(window.scrollY > THRESHOLD);
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
    <span className="flex items-center" style={{ height: HEIGHT }}>
      <Image
        src="/nav-mark.png"
        alt=""
        width={178}
        height={120}
        priority
        style={{ width: MARK_W, height: HEIGHT }}
      />
      <span
        aria-hidden
        className="block overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ width: open ? ROSS_W : 0 }}
      >
        <Image
          src="/nav-ross.png"
          alt=""
          width={605}
          height={120}
          priority
          className={`max-w-none transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
            open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
          }`}
          style={{ width: ROSS_W, height: HEIGHT }}
        />
      </span>
    </span>
  );
}
