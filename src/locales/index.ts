import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'

export const defaultLocale = 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  missingWarn: false,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-CN': zhCN,
  },
})

export const loadLanguageAsync = async (locale: string) => {
  const current = i18n.global.locale.value
  try {
    if (current === locale)
      return nextTick()

    const messages = await import(`./lang/${locale}.ts`)
    if (messages)
      i18n.global.setLocaleMessage(locale, messages.default)
  }
  catch (e) {
    console.warn('load language error', e)
  }
  return nextTick()
}

export default i18n
