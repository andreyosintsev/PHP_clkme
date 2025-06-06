import rawTranslations from '../i18n/languages.json';
import { Translations } from './types';

const translations = rawTranslations as Translations;

const defaultLang = 'en';
let   currentLang = 'ru';

export function setLanguage(lang: string) {
  if (translations[lang]) {
    currentLang = lang;
  } else {
    currentLang = defaultLang;
    console.warn(`Language '${lang}' not found, falling back to defaultLang: '${currentLang}'`);
  }
}

export function _t(path: string): string {
  const keys = path.split('.');
  let result: any = translations[currentLang];

  for (const key of keys) {
    console.log('result:', result);
    console.log('key:', key);
    result = result?.[key];
    console.log('result?.[key]:', result);

    if (result === undefined) {
      console.log(result);
      console.warn(`Missing translation for '${path}' in '${currentLang}'`);
      return path;
    }
  }

  return result;
}
