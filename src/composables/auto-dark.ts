export const isDark = useDark()

export const toggleDark = useToggle(isDark)

export const useAutoDark = () => {
  // const isPrefersDark = usePreferredDark()
  const appStore = useAppStore()

  if (appStore.layout.layoutStyle === 'dark')
    toggleDark(true)
  else
    toggleDark(false)

  // watch(
  //   isPrefersDark,
  //   isDark => {
  //       if (appStore.layout.layoutStyle === 'dark') return
  //     if (isDark) appStore.updateLayoutStyle('dark')
  //     else appStore.updateLayoutStyle('light')
  //
  //     toggleDark(isDark)
  //   },
  //   { immediate: true }
  // )
}
