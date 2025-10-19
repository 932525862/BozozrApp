export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // oy 0 dan boshlanadi
    const year = date.getFullYear();
  
    return `${month}-${day}-${year}`;
  }
  export function formatDateDot(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // oy 0 dan boshlanadi
    const year = date.getFullYear();
  
    return `${month}.${day}.${year}`;
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

  // utils/getLocalizedValue.ts
export const getLangValue = (valueObj, field, lang) => {
  if (!valueObj || !field) return "";

  // Krill (krl) tilini Uzk sifatida qabul qilamiz
  let normalizedLang = lang?.toLowerCase() === "krl" ? "uzk" : lang?.toLowerCase();

  // Bosh harfini katta qilamiz (uz → Uz, ru → Ru, uzk → Uzk)
  const langKey = normalizedLang.charAt(0).toUpperCase() + normalizedLang.slice(1);

  // Dinamik property nomini yasaymiz
  const localizedKey = `${field}${langKey}`; // masalan: titleUz / titleUzk / titleRu / titleEn

  // Agar shu til mavjud bo‘lsa, uni qaytaramiz
  if (valueObj[localizedKey]) {
    return valueObj[localizedKey];
  }

  // Aks holda fallback tartibi
  return (
    valueObj[`${field}Uz`] ||
    valueObj[`${field}Uzk`] ||
    valueObj[`${field}En`] ||
    valueObj[`${field}Ru`] ||
    ""
  );
};

export function formatNumberWithSpace(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatDateNot(isoString) {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  // "April 13, 2025, 10:00 AM" ko‘rinishida chiqadi
  const formatted = date.toLocaleString("en-US", options);

  // faqat "at" so‘zi qo‘shamiz
  return formatted.replace(",", " at");
}
