export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // oy 0 dan boshlanadi
    const year = date.getFullYear();
  
    return `${month}-${day}-${year}`;
  }

  export function maskUzPhone(input) {
    // faqat raqamlarni olamiz
    const digits = (input || '').replace(/\D/g, '');
    // agar +998 yoki 998 bilan bo'lsa, olib tashlaymiz
    let local = digits;
    if (local.startsWith('998')) local = local.slice(3);
    // endi mahalliy format 9 xonali bo'lishi kerak
    if (local.length !== 9) return null; // noto'g'ri format bo'lsa null qaytadi
    const first2 = local.slice(0, 2);
    const last4 = local.slice(-4);
    const middleLen = local.length - 2 - 4; // odatda 3
    const maskedMiddle = '*'.repeat(Math.max(0, middleLen));
    return `${first2} ${maskedMiddle} ${last4}`;
  }