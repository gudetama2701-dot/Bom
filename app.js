const imageInput = document.getElementById('receiptImage');
const preview = document.getElementById('preview');
const previewPlaceholder = document.getElementById('previewPlaceholder');
const extractedStatus = document.getElementById('extractedStatus');
const detectedAmount = document.getElementById('detectedAmount');
const extractedText = document.getElementById('extractedText');
const qrMerchant = document.getElementById('qrMerchant');
const qrReference = document.getElementById('qrReference');
const qrDate = document.getElementById('qrDate');
const bankName = document.getElementById('bankName');
const resultMerchant = document.getElementById('resultMerchant');
const resultAmount = document.getElementById('resultAmount');
const resultDate = document.getElementById('resultDate');
const resultBankName = document.getElementById('resultBankName');
const resultSender = document.getElementById('resultSender');
const resultRecipient = document.getElementById('resultRecipient');
const resultAccount = document.getElementById('resultAccount');
const resultReference = document.getElementById('resultReference');
const resultTime = document.getElementById('resultTime');
const resultBranch = document.getElementById('resultBranch');
const resultStatus = document.getElementById('resultStatus');
const amountConfidence = document.getElementById('amountConfidence');
const sampleQrButton = document.getElementById('loadSampleQr');
const sampleBankPayload = `amount=1250.50\nbank=SCB\nmerchant=ร้านค้า ABC\nreference=TXN123456789\ndate=05/07/2026\nfrom=นายสมชาย\nto=ร้านค้า ABC\naccount=1234567890\nbranch=สาขาเซ็นทรัล\ntime=16:30`;

function resetExtraction() {
  extractedStatus.textContent = 'ยังไม่ได้อัปโหลดสลิป';
  detectedAmount.textContent = '—';
  qrMerchant.textContent = '—';
  qrReference.textContent = '—';
  qrDate.textContent = '—';
  bankName.textContent = '—';
  resultMerchant.textContent = '—';
  resultAmount.textContent = '—';
  resultDate.textContent = '—';
  resultBankName.textContent = '—';
  resultSender.textContent = '—';
  resultRecipient.textContent = '—';
  resultAccount.textContent = '—';
  resultReference.textContent = '—';
  resultTime.textContent = '—';
  resultBranch.textContent = '—';
  resultStatus.textContent = '—';
  amountConfidence.textContent = 'ความมั่นใจ: —';
  amountConfidence.className = 'confidence-pill low';
  extractedText.textContent = '';
}

function parseNumericValue(rawValue) {
  const normalized = `${rawValue}`.trim().replace(/\s/g, '');
  if (!normalized) {
    return null;
  }

  if (normalized.includes(',') && normalized.includes('.')) {
    const lastComma = normalized.lastIndexOf(',');
    const lastDot = normalized.lastIndexOf('.');
    if (lastComma > lastDot) {
      return Number(normalized.replace(/\./g, '').replace(/,/g, '.'));
    }
    return Number(normalized.replace(/,/g, ''));
  }

  if (normalized.includes(',')) {
    return Number(normalized.replace(/,/g, '.'));
  }

  return Number(normalized);
}

function formatAmount(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return '—';
  }

  return `${value.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`;
}

function parseEmvAmount(payload) {
  const compactPayload = `${payload || ''}`.replace(/[^0-9A-F]/gi, '').toUpperCase();
  if (!compactPayload || compactPayload.length < 4) {
    return null;
  }

  let index = 0;
  while (index + 4 <= compactPayload.length) {
    const tag = compactPayload.slice(index, index + 2);
    const lengthHex = compactPayload.slice(index + 2, index + 4);
    const length = parseInt(lengthHex, 16);

    if (Number.isNaN(length) || index + 4 + length * 2 > compactPayload.length) {
      break;
    }

    if (tag === '54') {
      const valueHex = compactPayload.slice(index + 4, index + 4 + length * 2);
      const digits = Array.from(valueHex).map((char) => parseInt(char, 16)).join('');
      const numericDigits = digits.replace(/[^0-9]/g, '');
      if (numericDigits.length > 2) {
        const amount = Number(`${numericDigits.slice(0, -2)}.${numericDigits.slice(-2)}`);
        if (Number.isFinite(amount) && amount > 0) {
          return amount;
        }
      }
    }

    index += 4 + length * 2;
  }

  return null;
}

function extractAmountFromBankString(text) {
  if (!text) {
    return null;
  }

  const normalized = `${text}`.trim();
  const candidates = [];

  const addCandidate = (value) => {
    if (Number.isFinite(value) && value > 0 && value < 100000000) {
      candidates.push(value);
    }
  };

  const structuredPairs = normalized.split(/[?&;|]/).filter(Boolean);
  structuredPairs.forEach((segment) => {
    if (!segment.includes('=')) {
      return;
    }

    const [rawKey, ...valueParts] = segment.split('=');
    const key = rawKey.toLowerCase();
    const value = valueParts.join('=');
    const isAmountKey = /^(amount|amt|total|sum|value|price|money|ยอด|เงิน|โอน|ชำระ)$/i.test(key);
    if (isAmountKey) {
      addCandidate(parseNumericValue(value));
    }
  });

  const patterns = [
    /(?:amount|amt|total|sum|value|price|money|ยอด|เงิน|โอน|ชำระ)[\s:=]*([0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)/gi,
    /(?:^|[?&|;])(?:amount|amt|total|sum|value|price|money|ยอด|เงิน|โอน|ชำระ)=([0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)/gi,
    /(?:thb|บาท|฿|baht|usd|\$)\s*([0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)/gi,
    /([0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)\s*(?:thb|บาท|฿|baht|usd|\$)/gi,
  ];

  patterns.forEach((pattern) => {
    for (const match of normalized.matchAll(pattern)) {
      addCandidate(parseNumericValue(match[1] || match[0]));
    }
  });

  const emvAmount = parseEmvAmount(normalized);
  if (emvAmount !== null) {
    addCandidate(emvAmount);
  }

  if (candidates.length === 0) {
    return null;
  }

  return candidates.sort((a, b) => b - a)[0];
}

function looksLikeDateOrReference(line) {
  const normalizedLine = line.toLowerCase();
  if (/\b(date|time|datetime|txn|transaction|ref|reference|invoice|receipt|id|tel|mobile|phone|card|cvv|serial|trace|otp)\b/i.test(normalizedLine)) {
    return true;
  }

  if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(line) || /^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(line)) {
    return true;
  }

  if (/^\d{6,}$/.test(line.replace(/[^0-9]/g, ''))) {
    return true;
  }

  return false;
}

function parseAmountFromText(text) {
  if (!text) {
    return null;
  }

  const explicitAmount = extractAmountFromBankString(text);
  if (explicitAmount !== null) {
    return explicitAmount;
  }

  const lines = text.split(/\n|\r/).map((line) => line.trim()).filter(Boolean);
  const amountKeywordPattern = /(amount|total|sum|paid|pay|receive|received|transfer|credited|deposit|ยอด|จำนวน|โอน|ชำระ|เงิน|amt|balance)/i;
  const preferredKeywords = ['ยอด', 'โอน', 'เงิน', 'จำนวน', 'ชำระ', 'received', 'transfer', 'deposit', 'amount', 'paid', 'total', 'balance'];
  const currencyPattern = /(thb|บาท|฿|baht|usd|\$)/i;
  const candidates = [];

  lines.forEach((line) => {
    const normalizedLine = line.toLowerCase();
    if (looksLikeDateOrReference(line) && !amountKeywordPattern.test(normalizedLine) && !currencyPattern.test(normalizedLine)) {
      return;
    }

    const lineWithoutPunctuation = line.replace(/[,/()]/g, ' ');
    const numbers = Array.from(lineWithoutPunctuation.matchAll(/([0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)/g))
      .map((match) => parseNumericValue(match[1]))
      .filter((value) => Number.isFinite(value) && value > 0 && value < 100000000);

    if (numbers.length === 0) {
      return;
    }

    const filteredNumbers = numbers.filter((value) => !(value >= 1900 && value <= 2100));
    const chosenValue = filteredNumbers.length > 0 ? filteredNumbers[0] : numbers[0];
    const matchedKeyword = preferredKeywords.find((keyword) => normalizedLine.includes(keyword.toLowerCase()));
    const hasDecimal = /[.][0-9]{1,2}$/.test(line) || /[.][0-9]{1,2}\s*(บาท|thb|baht|usd|\$)?$/i.test(line);
    const hasMoneyKeyword = amountKeywordPattern.test(normalizedLine) || currencyPattern.test(normalizedLine);
    const isLikelyAmount = hasMoneyKeyword || matchedKeyword || (chosenValue >= 1 && chosenValue <= 1000000 && !/\b\d{4,}\b/.test(normalizedLine));
    const score = (hasMoneyKeyword ? 90 : 0) + (matchedKeyword ? 60 : 0) + (currencyPattern.test(normalizedLine) ? 35 : 0) + (filteredNumbers.length === 1 ? 12 : 0) + (hasDecimal ? 18 : 0) + (isLikelyAmount ? 20 : 0);

    if (score > 80) {
      candidates.push({ value: chosenValue, score, line });
    }
  });

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => b.score - a.score || b.value - a.value);
  return candidates[0].value;
}

function getAmountConfidence(text, amount) {
  if (!amount || !Number.isFinite(amount) || amount <= 0) {
    return { label: 'ต่ำ', detail: 'ยังไม่พบยอดเงินที่ชัดเจน', level: 'low' };
  }

  const normalized = `${text || ''}`.trim();
  const hasExplicitAmountPattern = /(?:amount|amt|total|sum|value|price|money|ยอด|เงิน|โอน|ชำระ)[\s:=]*/i.test(normalized);
  const hasCurrencyMarker = /(?:thb|บาท|฿|baht|usd|\$)/i.test(normalized);
  const hasBankStylePattern = /(?:^|[?&|;])(?:amount|amt|total|sum|value|price|money|ยอด|เงิน|โอน|ชำระ)=|54\d{2}/i.test(normalized);

  if (hasBankStylePattern && (hasExplicitAmountPattern || hasCurrencyMarker)) {
    return { label: 'สูง', detail: 'ดึงจากธนาคาร/QR แบบชัดเจน', level: 'high' };
  }

  if (hasExplicitAmountPattern || hasCurrencyMarker) {
    return { label: 'กลาง', detail: 'ข้อความที่ระบุยอดเงิน', level: 'medium' };
  }

  return { label: 'ต่ำ', detail: 'คาดเดาจากข้อความทั่วไป', level: 'low' };
}

function detectBankName(text) {
  const normalized = `${text || ''}`.toLowerCase();
  const bankHints = [
    ['scb', 'SCB'],
    ['kasikorn', 'KASIKORN'],
    ['krungsri', 'KRUNGSRI'],
    ['ttb', 'TTB'],
    ['bangkok bank', 'Bangkok Bank'],
    ['bank of ayudhya', 'Bank of Ayudhya'],
    ['ghbank', 'GHBANK'],
    ['krungthai', 'Krungthai'],
    ['promtpay', 'PromptPay'],
  ];

  const match = bankHints.find(([token]) => normalized.includes(token));
  return match ? match[1] : 'ธนาคารที่ระบุใน QR';
}

function extractBankField(text, regexes, fallback = '—') {
  const normalized = `${text || ''}`;
  for (const regex of regexes) {
    const match = normalized.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return fallback;
}

function applyPayloadToUi(payload, sourceLabel = 'QR') {
  const parsed = parseQrPayload(payload);
  const amount = parsed.amount || parseAmountFromText(payload);
  const confidence = getAmountConfidence(payload, amount);

  if (amount) {
    detectedAmount.textContent = formatAmount(amount);
    amountConfidence.textContent = `${confidence.label} · ${confidence.detail}`;
    amountConfidence.className = `confidence-pill ${confidence.level}`;
    const amountField = document.querySelector('input[name="amount"]');
    if (amountField) {
      amountField.value = amount.toFixed(2);
    }
  } else {
    detectedAmount.textContent = 'ยังไม่พบยอดเงินที่โอนเข้ามา';
    amountConfidence.textContent = '—';
    amountConfidence.className = 'confidence-pill low';
  }

  qrMerchant.textContent = parsed.merchant || 'ไม่ระบุ';
  qrReference.textContent = parsed.reference || '—';
  qrDate.textContent = parsed.date || '—';
  bankName.textContent = parsed.bank || 'ธนาคารที่ระบุใน QR';
  resultMerchant.textContent = parsed.merchant || 'ไม่ระบุ';
  resultAmount.textContent = amount ? formatAmount(amount) : '—';
  resultDate.textContent = parsed.date || '—';
  resultBankName.textContent = parsed.bank || 'ธนาคารที่ระบุใน QR';
  resultSender.textContent = parsed.sender || 'ผู้โอนที่ระบุใน QR';
  resultRecipient.textContent = parsed.recipient || 'ผู้รับที่ระบุใน QR';
  resultAccount.textContent = parsed.account || '•••••••';
  resultReference.textContent = parsed.reference || '—';
  resultTime.textContent = parsed.time || parsed.date || '—';
  resultBranch.textContent = parsed.branch || 'สาขาเริ่มต้น';
  resultStatus.textContent = parsed.status || 'สำเร็จ';
  extractedStatus.textContent = sourceLabel === 'ตัวอย่าง' ? 'อ่าน QR code ตัวอย่างสำเร็จ' : 'อ่าน QR code สำเร็จ';
  extractedText.textContent = payload;
}

function parseQrPayload(payload) {
  const lines = payload.split(/\n|\r/).map((line) => line.trim()).filter(Boolean);
  const amount = parseAmountFromText(payload);

  const merchant = lines.find((line) => /merchant|seller|shop|store|company|from|to/i.test(line)) || lines[1] || 'ไม่ระบุ';
  const reference = extractBankField(payload, [
    /ref(?:erence)?\s*[:=]\s*([^\n]+)/i,
    /txn(?:id)?\s*[:=]\s*([^\n]+)/i,
    /transfer(?:id)?\s*[:=]\s*([^\n]+)/i,
    /id\s*[:=]\s*([^\n]+)/i,
  ], '—');
  const date = lines.find((line) => /date|time|datetime/i.test(line)) || '—';
  const bank = detectBankName(payload);
  const sender = extractBankField(payload, [
    /from\s*[:=]\s*([^\n]+)/i,
    /sender\s*[:=]\s*([^\n]+)/i,
    /payer\s*[:=]\s*([^\n]+)/i,
    /customer\s*[:=]\s*([^\n]+)/i,
  ], 'ผู้โอนที่ระบุใน QR');
  const recipient = extractBankField(payload, [
    /to\s*[:=]\s*([^\n]+)/i,
    /receiver\s*[:=]\s*([^\n]+)/i,
    /recipient\s*[:=]\s*([^\n]+)/i,
  ], 'ผู้รับที่ระบุใน QR');
  const account = extractBankField(payload, [
    /acct(?:ount)?\s*[:=]\s*([^\n]+)/i,
    /account\s*[:=]\s*([^\n]+)/i,
    /acc\s*[:=]\s*([^\n]+)/i,
  ], '•••••••');
  const time = extractBankField(payload, [
    /time\s*[:=]\s*([^\n]+)/i,
    /datetime\s*[:=]\s*([^\n]+)/i,
    /timestamp\s*[:=]\s*([^\n]+)/i,
  ], '—');
  const branch = extractBankField(payload, [
    /branch\s*[:=]\s*([^\n]+)/i,
    /branchname\s*[:=]\s*([^\n]+)/i,
    /branch code\s*[:=]\s*([^\n]+)/i,
  ], 'สาขาเริ่มต้น');
  const status = 'สำเร็จ';

  return { amount, merchant, reference, date, bank, sender, recipient, account, time, branch, status, raw: payload };
}

async function analyzeReceiptImage(file) {
  if (!file) {
    resetExtraction();
    return;
  }

  extractedStatus.textContent = 'กำลังอ่าน QR code จากภาพสลิป...';
  extractedText.textContent = 'ระบบกำลังสแกนข้อมูลจาก QR code โปรดรอสักครู่';

  try {
    const imageBitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    context.drawImage(imageBitmap, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (!code) {
      extractedStatus.textContent = 'ไม่พบ QR code ในภาพนี้';
      detectedAmount.textContent = '—';
      qrMerchant.textContent = '—';
      qrReference.textContent = '—';
      qrDate.textContent = '—';
      extractedText.textContent = 'ลองอัปโหลดภาพสลิปที่มี QR code ชัดเจนขึ้น';
      return;
    }

    const payload = code.data;
    applyPayloadToUi(payload);
  } catch (error) {
    extractedStatus.textContent = 'ไม่สามารถอ่าน QR code ได้ในตอนนี้';
    extractedText.textContent = 'ลองอัปโหลดภาพที่ชัดเจนขึ้นหรือเปลี่ยนไฟล์ภาพอีกครั้ง';
    console.error('QR decode failed', error);
  }
}

sampleQrButton?.addEventListener('click', () => {
  preview.style.display = 'none';
  previewPlaceholder.style.display = 'flex';
  previewPlaceholder.textContent = 'กำลังทดสอบด้วยข้อมูล QR ตัวอย่างจากธนาคาร';
  applyPayloadToUi(sampleBankPayload, 'ตัวอย่าง');
});

sampleQrButton?.click();

imageInput.addEventListener('change', async () => {
  const file = imageInput.files?.[0];
  if (!file) {
    preview.style.display = 'none';
    preview.removeAttribute('src');
    previewPlaceholder.style.display = 'flex';
    resetExtraction();
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  preview.src = objectUrl;
  preview.style.display = 'block';
  previewPlaceholder.style.display = 'none';

  await analyzeReceiptImage(file);

  const result = evaluateReceipt({}, file);
  renderResult(result);
});

function evaluateReceipt(data, file) {
  const reasons = [];
  let score = 0;

  if (!file) {
    score += 45;
    reasons.push('ยังไม่ได้อัปโหลดภาพสลิป');
  } else {
    score += 12;
    reasons.push('อัปโหลดภาพสลิปเรียบร้อย');

    if (file.size > 5 * 1024 * 1024) {
      score += 8;
      reasons.push('ไฟล์ภาพมีขนาดค่อนข้างใหญ่ อาจเป็นภาพที่ผ่านการแก้ไข');
    }

    if (file.type.startsWith('image/')) {
      reasons.push('ไฟล์เป็นภาพที่สามารถตรวจสอบเบื้องต้นได้');
    } else {
      score += 10;
      reasons.push('ชนิดไฟล์ไม่ใช่ภาพ');
    }
  }

  const hasAnyField = Object.values(data).some((value) => typeof value === 'string' ? value.trim() : Boolean(value));
  if (!hasAnyField && file) {
    reasons.push('ยังไม่มีข้อมูลเพิ่มเติมจากผู้ใช้ ระบบประเมินจากภาพสลิปเบื้องต้น');
  }

  if (data.merchant?.trim()) {
    if (data.merchant.trim().length < 3) {
      score += 5;
      reasons.push('ชื่อร้านสั้นเกินไป');
    }
  }

  const amount = Number(data.amount);
  if (data.amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      score += 8;
      reasons.push('จำนวนเงินไม่ถูกต้อง');
    }
  }

  if (data.date) {
    const receiptDate = new Date(`${data.date}T00:00:00`);
    const today = new Date();
    if (receiptDate > today) {
      score += 10;
      reasons.push('วันที่บนสลิปเป็นอนาคต');
    }
  }

  if (data.paymentMethod) {
    reasons.push(`ระบุช่องทางชำระเงินเป็น ${data.paymentMethod}`);
  }

  if (data.receiptNumber?.trim()) {
    reasons.push(`มีเลขที่สลิป ${data.receiptNumber}`);
  }

  const notes = (data.notes || '').toLowerCase();
  const suspiciousKeywords = ['urgent', 'cash', 'manual', 'copy', 'gift', 'discount', 'refund', 'ด่วน', 'ยกเลิก'];
  const foundKeywords = suspiciousKeywords.filter((keyword) => notes.includes(keyword));
  if (foundKeywords.length > 0) {
    score += 6;
    reasons.push(`มีคำที่น่าสงสัย: ${foundKeywords.join(', ')}`);
  }

  const taxAmount = Number(data.taxAmount);
  if (Number.isFinite(taxAmount) && taxAmount > 0 && Number.isFinite(amount) && amount > 0 && taxAmount > amount * 0.35) {
    score += 10;
    reasons.push('ค่าธรรมเนียม/ภาษีสูงเกินไปเมื่อเทียบกับยอดเงิน');
  }

  const riskScore = Math.min(100, Math.max(0, score));

  let verdict = 'มีความน่าเชื่อถือสูง';
  let recommendationText = 'สลิปนี้ดูเหมือนปกติและสามารถตรวจสอบต่อได้จากแหล่งชำระเงินหรือร้านที่เกี่ยวข้อง';

  if (riskScore >= 70) {
    verdict = 'มีแนวโน้มปลอมสูง';
    recommendationText = 'หลีกเลี่ยงการรับรองสลิปนี้และติดต่อร้านที่เกี่ยวข้องทันที';
  } else if (riskScore >= 35) {
    verdict = 'ต้องตรวจสอบเพิ่มเติม';
    recommendationText = 'ตรวจสอบภาพสลิปให้ชัดเจนและยืนยันกับแหล่งชำระเงินก่อนรับรอง';
  }

  return { riskScore, verdict, reasons, recommendationText };
}

const saved = localStorage.getItem('lastReceiptEvaluation');
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    if (parsed?.result) {
      // Previous evaluation output is intentionally hidden.
    }
  } catch (error) {
    console.error('Unable to load saved result', error);
  }
}
