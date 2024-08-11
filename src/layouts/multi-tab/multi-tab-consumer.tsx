import { omit } from 'lodash-es'
import { KeepAlive } from '@vue/runtime-core'

export const MultiTabConsumer = defineComponent({
  name: 'MultiTabConsumer',
  setup(_props, { slots }) {
    /**
     * 这里是类似于我们的setup的写法
     */
    const state = useMultiTabInject()
    const route = useRoute()
    const getCurrentItem = () => {
      const path = route.path
      return state.tabList?.find(item => item.path === path)
    }

    return () => {
      /**
       * 类似于我们的template部分
       */
      const component = slots.default?.()
      if (!component)
        return null
      let currentItem = getCurrentItem()
      const componentCache = toRaw(state.componentCache)
      if (!currentItem) {
        currentItem = {
          path: route.path,
          tabTitle: route.meta.title,
          route: omit(route, ['matched']),
          key: state.guid(),
        }
        state.tabList?.push(currentItem)
      }
      const exclude: string[] = []
      if (route.meta.keepAlive === false && isReactive(currentItem))
        exclude.push(currentItem.key!)

      const NewComp
        = componentCache[currentItem.key!]
        || defineComponent({
          name: currentItem.key,
          setup() {
            return () => <>{component}</>
          },
        })
      if (exclude.find(k => k === currentItem?.key))
        delete componentCache[currentItem.key!]
      else componentCache[currentItem.key!] = NewComp

      return (
        <KeepAlive exclude={exclude}>
          <NewComp key={currentItem.key + route.fullPath} />
        </KeepAlive>
      )
    }
  },
})
