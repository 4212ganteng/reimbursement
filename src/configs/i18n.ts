export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'id'],
  langDirection: {
    en: 'ltr',
    id: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
