# XROSS 랜딩페이지

AI 기반 무인매장 관제 솔루션 XROSS의 도입 상담용 랜딩페이지입니다. Next.js(App Router)와 Tailwind CSS v4로 만들었습니다.

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 프로덕션 빌드
```

## 도입 상담 폼 연결

문의는 `POST /api/contact`([src/app/api/contact/route.ts](src/app/api/contact/route.ts))로 접수되며, 환경 변수 `CONTACT_WEBHOOK_URL`로 전달됩니다.

- Slack/Discord 웹훅: 본문의 `text`/`content` 필드가 그대로 메시지로 표시됩니다.
- Google 스프레드시트: Apps Script 웹 앱 URL을 넣고 JSON의 각 필드를 행으로 기록하면 됩니다.
- 개발 모드에서 웹훅이 없으면 서버 콘솔에만 기록하고, 운영 환경에서 웹훅이 없으면 오류를 반환합니다(문의 유실 방지).

## 구성

| 섹션 | 파일 |
|---|---|
| Hero (관제 화면 애니메이션) | `src/components/Hero.tsx`, `HeroConsole.tsx` |
| Problem | `Problem.tsx` |
| Solution (교차검증 다이어그램) | `Solution.tsx` |
| How It Works (스크롤 시나리오) | `HowItWorks.tsx` |
| Features | `Features.tsx` |
| Dashboard Preview | `DashboardPreview.tsx` |
| Why XROSS | `WhyXross.tsx` |
| FAQ | `Faq.tsx` |
| Contact | `Contact.tsx`, `src/lib/contact.ts` |

시나리오 상품·가격(아이스크림 3개 선택, 2개 결제)은 `src/lib/scenario.ts`에서 한 번에 바꿀 수 있습니다.

## 교체가 필요한 항목

- 관제·모바일 화면은 HTML로 그린 예시입니다. 실제 서비스 화면이 준비되면 `DashboardPreview.tsx`의 목업을 스크린샷으로 교체하세요.
- 개인정보 보유 기간(상담 완료 후 1년)은 실제 내부 방침에 맞게 확인이 필요합니다.
