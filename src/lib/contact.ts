export const storeTypes = [
  "무인 아이스크림 판매점",
  "무인 편의점",
  "무인 소매점",
  "기타 셀프 결제 매장",
  "아직 운영 전",
] as const;

export const storeCounts = ["1개", "2~4개", "5개 이상", "운영 예정"] as const;

export const pains = [
  "미결제 상품 관리",
  "CCTV를 계속 확인하는 부담",
  "매장 방문 부담",
  "사고 발생 시 영상 확인",
  "기타",
] as const;

export type ContactInput = {
  name: string;
  phone: string;
  storeType: string;
  storeCount: string;
  region: string;
  message: string;
  pilot: boolean;
  pain: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export function parseContact(raw: Record<string, unknown>): {
  data: ContactInput;
  errors: FieldErrors;
} {
  const data: ContactInput = {
    name: str(raw.name, 50),
    phone: str(raw.phone, 30),
    storeType: str(raw.storeType, 30),
    storeCount: str(raw.storeCount, 20),
    region: str(raw.region, 50),
    message: str(raw.message, 2000),
    pilot: raw.pilot === true || raw.pilot === "on",
    pain: str(raw.pain, 30),
    consent: raw.consent === true || raw.consent === "on",
  };

  const errors: FieldErrors = {};
  if (!data.name) errors.name = "성함 또는 담당자명을 입력해 주세요.";
  const digits = data.phone.replace(/\D/g, "");
  if (!data.phone) errors.phone = "연락처를 입력해 주세요.";
  else if (digits.length < 9 || digits.length > 12)
    errors.phone = "연락처는 숫자 9~12자리로 입력해 주세요. 예: 010-1234-5678";
  if (!(storeTypes as readonly string[]).includes(data.storeType))
    errors.storeType = "매장 유형을 선택해 주세요.";
  if (data.storeCount && !(storeCounts as readonly string[]).includes(data.storeCount))
    data.storeCount = "";
  if (data.pain && !(pains as readonly string[]).includes(data.pain)) data.pain = "";
  if (!data.consent) errors.consent = "개인정보 수집 및 이용에 동의해 주세요.";

  return { data, errors };
}
