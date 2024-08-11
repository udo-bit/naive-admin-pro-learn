import { defaultLocale, loadLanguageAsync } from '~/locales'

export const useAppLocale = createGlobalState(() => useStorage('locale', defaultLocale))

export const useAutoLang = () => {
  const appLocale = useAppLocale()

  const { locale, getLocaleMessage, t } = useI18n()
  const route = useRoute()
  const appStore = useAppStore()
  const setLanguage = async (lang: string) => {
    try {
      await loadLanguageAsync(lang)
      appLocale.value = lang
      locale.value = lang
      const title = route.meta?.title
      if (title) {
        const localeTitle = t(title)
        document.title = `${localeTitle} - ${appStore.layout.title}`
      }
    }
    catch (e) {}
  }
  const { isSupported, language } = useNavigatorLanguage()
  if (isSupported.value) {
    if (language.value && language.value !== defaultLocale)
      setLanguage(language.value).then(() => {})

    watch(language, (lang) => {
      if (lang)
        setLanguage(lang).then(() => {})
    })
  }

  watch(appLocale, (lang) => {
    if (lang && lang !== locale.value)
      setLanguage(lang).then(() => {})
  })

  setLanguage(appLocale.value).then(() => {})

  const naiveLocale = computed(() => getLocaleMessage(appLocale.value).naiveUI || {})
  return {
    naiveLocale,
  }
}
