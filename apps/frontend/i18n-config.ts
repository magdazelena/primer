export const i18n = {
    defaultLocale: 'en',
    locales: ['en'], //note: more can be added later, will require localising UI
} as const;

export type Locale = typeof i18n['locales'][number];
