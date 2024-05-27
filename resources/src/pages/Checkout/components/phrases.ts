export const phrases: {[key: string]: {[key: string]: string}} = {
  ar: {
    name_on_card: 'الاسم على البطاقة',
    or: 'أو',
  },
  de: {
    name_on_card: 'Name auf der Karte',
    or: 'oder',
  },
  en: {
    name_on_card: 'Name on card',
    or: 'or'
  },
  es: {
    name_on_card: 'Titular de la tarjeta',
    or: 'o',
  },
  fr: {
    name_on_card: 'Nom sur la carte',
    or: 'ou',
  },
  it: {
    name_on_card: 'Nome sulla carta',
    or: 'o',
  },
  pt: {
    name_on_card: 'Nome no cartão',
    or: 'ou',
  },
  ru: {
    name_on_card: 'Имя на карте',
    or: 'или',
  },
  zh: {
    name_on_card: '持卡人姓名',
    or: '或',
  }
};

export const getPhrase = (key: string, lang: string = 'en'): string => {
  const list = phrases[lang] ?? phrases.en;
  return list[key] ?? key;
};
