import { omit } from 'lodash-es'
import { MULTI_TAB_STATE_KEY } from '~/layouts/multi-tab/type'

export const useMultiTabProvider = () => {
  let g = 0
  const guid = () => `CacheTab_${++g}`
  const state = reactive({
    tabList: [],
    current: '',
    guid,
    componentCache: {},
  })

  provide(MULTI_TAB_STATE_KEY, state)
  return state
}

export const useMultiTabInject = () => {
  return inject(MULTI_TAB_STATE_KEY)!
}

export const useMultiTab = () => {
  const state = useMultiTabInject()
  const tabList = computed(() => state.tabList)
  const current = computed(() => state.current)
  const route = useRoute()
  const router = useRouter()
  const { message } = useGlobalConfig()
  const componentCache = toRaw(state.componentCache)
  const closeTab = (path?: string) => {
    if (!path)
      path = current.value
    if (tabList.value.length <= 1) {
      message?.info('这是最后一个页签，无法被关闭')
      return
    }
    const currentIndex = tabList.value.findIndex(item => item.path === path)
    const currentItem = tabList.value[currentIndex]
    if (path !== current.value) {
      state.tabList.splice(currentIndex, 1)
      if (componentCache[currentItem.key!])
        delete componentCache[currentItem.key!]

      return
    }
    // 如果关闭的是当前页签
    // 如果当前页签不是第一个页签的话，我们让路由跳转到我们的上一个页签
    // 如果当前页签是第一个页签的话，我们让路由跳转到我们的下一个页签
    const targetIndex = currentIndex === 0 ? currentIndex + 1 : currentIndex - 1
    router.replace(tabList.value[targetIndex].route!).then(() => {
      state.tabList.splice(currentIndex, 1)
      if (componentCache[currentItem.key!])
        delete componentCache[currentItem.key!]
    })
  }

  const refresh = (path?: string) => {
    if (!path)
      path = current.value
    const currentIndex = tabList.value.findIndex(item => item.path === path)
    const currentItem = tabList.value[currentIndex]
    state.tabList[currentIndex] = { ...toRaw(currentItem), key: state.guid() }
    if (componentCache[currentItem.key!])
      delete componentCache[currentItem.key!]

    router
      .replace(currentItem.route!)
      .then(() => {})
      .catch(() => {})
  }

  watch(
    () => route.fullPath,
    () => {
      if (current.value !== route.path)
        state.current = route.path
      const tabIndex = tabList.value.findIndex(tab => tab.path === route.path)
      if (tabIndex !== -1) {
        // 更新一下路由信息
        state.tabList[tabIndex].route = omit(route, ['matched'])
      }
      else {
        // 添加路由信息
        // const item: TabItem = {
        //   path: route.path,
        //   tabTitle: route.meta.title,
        //   route: omit(route, ['matched']),
        // }
        // state.tabList.push(item)
      }
    },
    {
      immediate: true,
    },
  )
  return {
    tabList,
    current,
    closeTab,
    refresh,
  }
}
