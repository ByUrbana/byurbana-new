// Configuração de variáveis de ambiente
export const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyCO7eGtQ0JEuQ3PAqlOAWBM67HrZB2MVBQ';

// Configuração da API de tradução
export const TRANSLATION_CONFIG = {
  apiKey: GOOGLE_TRANSLATE_API_KEY,
  baseUrl: 'https://translation.googleapis.com/language/translate/v2',
  defaultSourceLanguage: 'es',
  supportedLanguages: {
    'pt': 'Português',
    'en': 'English', 
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'it': 'Italiano',
    'ja': '日本語',
    'ko': '한국어',
    'zh': '中文',
    'ar': 'العربية',
    'ru': 'Русский'
  }
} as const;
