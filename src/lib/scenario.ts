// 대표 시나리오: 아이스크림 3개를 고르고 2개만 결제한 뒤 퇴장
export const picked = [
  { name: "바닐라 콘", price: 1800 },
  { name: "초코 바", price: 1200 },
  { name: "딸기 컵", price: 2000 },
] as const;

export const paid = picked.slice(0, 2);

// 매장 내 경고 방송 예시 문구
export const broadcastMessage =
  "결제되지 않은 상품이 있습니다. 키오스크에서 결제를 완료해 주세요.";

export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;
