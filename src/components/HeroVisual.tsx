import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

// 매장 사진을 public/ 에 아래 이름 중 하나로 넣으면 자동으로 사용됩니다.
const PHOTO_CANDIDATES = ["hero-store.jpg", "hero-store.jpeg", "hero-store.png", "hero-store.webp"];
const photo = PHOTO_CANDIDATES.find((f) => existsSync(path.join(process.cwd(), "public", f)));

// 고객 인식 박스 위치 (사진 기준 %). 사진을 바꾸면 사람 위치에 맞게 조정하세요.
const BOX = { left: 28, top: 32, width: 40, height: 60 };

const delay = (s: number) => ({ animationDelay: `${s}s` });

/** 사진이 없을 때 쓰는 매장 일러스트 */
function StoreScene() {
  return (
    <svg
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="hs-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2a4f" />
          <stop offset="1" stopColor="#0c1631" />
        </linearGradient>
        <linearGradient id="hs-fridge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d8fd6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2a4a86" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="400" height="320" fill="#13203f" />
      {/* ceiling lights */}
      {[60, 110, 150].map((y, i) => (
        <rect key={y} x={150 - i * 25} y={y - 40} width={100 + i * 50} height="3" rx="1.5" fill="#cfe0ff" opacity={0.5 - i * 0.1} />
      ))}
      {/* back wall fridge */}
      <rect x="160" y="110" width="80" height="80" fill="url(#hs-fridge)" />
      {[0, 1, 2].map((r) => (
        <line key={r} x1="160" x2="240" y1={130 + r * 20} y2={130 + r * 20} stroke="#9cc0ff" strokeOpacity="0.35" />
      ))}
      <line x1="200" x2="200" y1="110" y2="190" stroke="#9cc0ff" strokeOpacity="0.35" />
      {/* floor */}
      <path d="M0 320 L160 190 L240 190 L400 320Z" fill="url(#hs-floor)" />
      {/* left shelves */}
      <path d="M0 40 L160 110 L160 190 L0 320Z" fill="#1a2950" />
      {[0, 1, 2, 3].map((r) => (
        <g key={`l${r}`}>
          <path
            d={`M0 ${90 + r * 55} L160 ${130 + r * 17}`}
            stroke="#2c3f70"
            strokeWidth="3"
          />
          {[0, 1, 2, 3, 4, 5].map((c) => (
            <rect
              key={c}
              x={10 + c * 24}
              y={70 + r * 55 - c * 5 + c * (r * 1.2)}
              width={14 - c}
              height={18 - c * 1.5}
              rx="1.5"
              fill={["#e0794f", "#e6b44c", "#5fa3e8", "#d9584f", "#8bc4a1", "#f0d27a"][(c + r) % 6]}
              opacity={0.55 - c * 0.05}
            />
          ))}
        </g>
      ))}
      {/* right shelves */}
      <path d="M400 40 L240 110 L240 190 L400 320Z" fill="#1a2950" />
      {[0, 1, 2, 3].map((r) => (
        <g key={`r${r}`}>
          <path d={`M400 ${90 + r * 55} L240 ${130 + r * 17}`} stroke="#2c3f70" strokeWidth="3" />
          {[0, 1, 2, 3, 4, 5].map((c) => (
            <rect
              key={c}
              x={376 - c * 24}
              y={70 + r * 55 - c * 5 + c * (r * 1.2)}
              width={14 - c}
              height={18 - c * 1.5}
              rx="1.5"
              fill={["#5fa3e8", "#f0d27a", "#e0794f", "#8bc4a1", "#e6b44c", "#d9584f"][(c + r) % 6]}
              opacity={0.55 - c * 0.05}
            />
          ))}
        </g>
      ))}
      {/* customer silhouette inside the detection box */}
      <g transform="translate(168 92)" fill="#0a1430" opacity="0.85">
        <circle cx="16" cy="10" r="9" />
        <path d="M2 30 Q16 18 30 30 L32 88 L22 88 L20 120 L12 120 L10 88 L0 88Z" />
      </g>
    </svg>
  );
}

/** 히어로 오른쪽: 매장 카메라 화면 + 인식 박스 + 알림 카드 */
export default function HeroVisual() {
  return (
    <figure
      className="relative pb-16 pl-4 pt-7 sm:pb-20 sm:pl-10"
      aria-label="XROSS 관제 화면 예시: 매장 카메라가 고객을 인식하고, 상품 3개 선택과 2개 결제를 비교해 미결제 의심 알림을 보냅니다."
    >
      {/* camera feed */}
      <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-signal/40 bg-ink-2 shadow-[0_40px_80px_-30px_rgba(31,91,255,0.45)]">
        {photo ? (
          <Image
            src={`/${photo}`}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-cover"
          />
        ) : (
          <StoreScene />
        )}
        <div className="absolute inset-0 bg-ink/30" aria-hidden />

        {/* live badge */}
        <span className="absolute right-3 top-3 flex items-center gap-2 rounded-md bg-ink/80 px-3 py-2 text-xs font-medium text-white backdrop-blur sm:right-5 sm:top-5 sm:text-sm">
          <span className="size-2 rounded-full bg-[#ff4d5e]" />
          LIVE · STORE 01
        </span>

        {/* detection box */}
        <div
          className="anim-rise absolute"
          style={{
            left: `${BOX.left}%`,
            top: `${BOX.top}%`,
            width: `${BOX.width}%`,
            height: `${BOX.height}%`,
            ...delay(0.5),
          }}
          aria-hidden
        >
          <span className="absolute inset-0 border border-sky/70" />
          {(["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"] as const).map(
            (c) => (
              <span key={c} className={`absolute size-3 border-white sm:size-4 ${c}`} />
            ),
          )}
          <span className="absolute -top-7 left-0 whitespace-nowrap bg-signal px-2 py-1 text-[11px] font-medium leading-none text-white sm:-top-8 sm:px-2.5 sm:py-1.5 sm:text-xs">
            Customer 01
          </span>
        </div>
      </div>

      {/* system status */}
      <div className="absolute left-0 top-0 flex items-center gap-2.5 rounded-lg border border-white/15 bg-ink-2/95 px-3.5 py-2.5 text-[13px] text-white shadow-lg backdrop-blur sm:px-4 sm:py-3 sm:text-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5ed3a8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        시스템 정상 작동 중
      </div>

      {/* detection count + alert */}
      <div className="absolute bottom-0 left-0 flex w-[min(100%,27rem)] flex-col items-start">
        <div
          className="anim-rise ml-5 flex items-center gap-3 rounded-t-lg border border-b-0 border-white/15 bg-ink-2/95 px-4 py-2 text-[13px] text-white backdrop-blur sm:ml-6 sm:text-sm"
          style={delay(1.1)}
        >
          상품 선택 감지
          <span className="tnum font-bold text-sky">3개</span>
        </div>
        <div
          className="anim-rise flex w-full items-center gap-4 rounded-xl border border-white/15 bg-ink-2/95 p-4 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)] backdrop-blur sm:p-5"
          style={delay(1.7)}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-alert/15 text-alert sm:size-12">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
              <path d="M10 20.5a2 2 0 0 0 4 0" />
            </svg>
          </span>
          <div className="min-w-0 flex-1 leading-snug">
            <p className="text-xs text-alert sm:text-[13px]">방금 전 · 미결제 의심</p>
            <p className="mt-1 font-bold text-white sm:text-[1.0625rem]">결제 수량이 일치하지 않습니다</p>
            <p className="mt-1 text-[13px] text-haze sm:text-sm">선택 3개 · 결제 2개</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="shrink-0 text-white/80">
            <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </figure>
  );
}
