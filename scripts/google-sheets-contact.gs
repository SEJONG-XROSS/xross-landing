/**
 * XROSS 도입 상담 신청 → Google 스프레드시트 기록용 Apps Script
 *
 * 사용 방법
 * 1. 스프레드시트에서 [확장 프로그램] → [Apps Script]를 열고 이 코드를 전부 붙여넣어 저장합니다.
 * 2. [프로젝트 설정(톱니바퀴)] → [스크립트 속성]에 추가합니다.
 *    - SECRET       : Vercel의 CONTACT_WEBHOOK_SECRET과 같은 값 (필수)
 *    - NOTIFY_EMAIL : 새 문의가 오면 알림 메일을 받을 주소 (선택, 여러 개는 쉼표로 구분)
 * 3. [배포] → [새 배포] → 유형 [웹 앱], 실행 사용자 [나], 액세스 권한 [모든 사용자]로 배포합니다.
 * 4. 발급된 웹 앱 URL을 Vercel의 CONTACT_WEBHOOK_URL에 등록합니다.
 *
 * 코드를 수정한 뒤에는 [배포] → [배포 관리] → 연필 아이콘 → 버전 [새 버전]으로 다시 배포해야 반영됩니다.
 */

const SHEET_NAME = '도입 상담';

const COLUMNS = [
  ['접수 시각', (d) => Utilities.formatDate(new Date(d.submittedAt || Date.now()), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss')],
  ['성함/담당자', (d) => d.name],
  ['연락처', (d) => d.phone],
  ['매장 유형', (d) => d.storeType],
  ['운영 매장 수', (d) => d.storeCount],
  ['매장 지역', (d) => d.region],
  ['시범 도입 관심', (d) => (d.pilot ? '예' : '아니오')],
  ['가장 큰 어려움', (d) => d.pain],
  ['문의 내용', (d) => d.message],
  ['처리 상태', () => '신규'],
  ['메모', () => ''],
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || data.secret !== secret) return json({ ok: false, error: 'unauthorized' });

    const sheet = getSheet();
    const row = COLUMNS.map(([, pick]) => asText(pick(data)));
    // 동시에 여러 건이 들어와도 행이 섞이지 않도록 잠금
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    notify(data);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([header]) => header));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold').setBackground('#eef2fb');
  }
  return sheet;
}

/** 전화번호 앞자리 0 보존 + 수식 실행(=, +, -, @로 시작) 방지를 위해 텍스트로 저장 */
function asText(value) {
  const s = value == null ? '' : String(value);
  return s === '' ? '' : "'" + s;
}

function notify(d) {
  const to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  const body = [
    '새 도입 상담 신청이 접수되었습니다.',
    '',
    '성함/담당자: ' + (d.name || '-'),
    '연락처: ' + (d.phone || '-'),
    '매장 유형: ' + (d.storeType || '-'),
    '운영 매장 수: ' + (d.storeCount || '-'),
    '매장 지역: ' + (d.region || '-'),
    '시범 도입 관심: ' + (d.pilot ? '예' : '아니오'),
    '가장 큰 어려움: ' + (d.pain || '-'),
    '문의 내용: ' + (d.message || '-'),
    '',
    '스프레드시트: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ].join('\n');
  MailApp.sendEmail(to, '[XROSS] 새 도입 상담 신청: ' + (d.name || ''), body);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
