import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "XROSS | AI 기반 무인매장 관제 솔루션",
  description:
    "AI 영상 분석과 무게 센서, 결제 데이터의 교차검증으로 무인매장의 미결제 의심 상황을 감지하고, 점주 알림과 매장 내 경고 방송으로 바로 대응합니다.",
  openGraph: {
    title: "XROSS | AI 기반 무인매장 관제 솔루션",
    description:
      "사장님이 없는 순간에도, 매장 관리는 계속되어야 하니까. 미결제 의심 상황을 감지해 점주에게 알리고 매장 안에서 경고 방송으로 안내합니다.",
    locale: "ko_KR",
    type: "website",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#081229",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
