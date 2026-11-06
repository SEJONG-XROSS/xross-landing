import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-12 text-sm text-haze">
      <div className="wrap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Image src="/logo-white.png" alt="XROSS" width={783} height={120} className="h-5 w-auto" />
          <p className="mt-4">AI 기반 무인매장 관제 솔루션</p>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <a href="#contact" className="text-white hover:underline">
            도입 상담 신청하기
          </a>
          <p>© 2026 XROSS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
