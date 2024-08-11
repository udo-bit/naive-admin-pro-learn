import { AxiosError } from 'axios'
import router from '~/routes'
import { useAppStore } from '~/stores/app'
import i18n from '~/locales'

export const loginRoute = '/login'

export const allowRoutes = ['/error', '/404', '/403', '/500', '/401']

export const hasLoginAllowRoutes = [...allowRoutes, loginRoute]

router.beforeEach(async (to, from, next) => {
  /**
   * 1. 判断我们token是否存在，如果存在，就代表已经登录
   */
  const token = useAuthorization()
  const userStore = useUserStore()
  const globalConfig = useGlobalConfig()
  globalConfig.loadingBar?.start()
  if (!token.value) {
    // 2. 如果不存在，就判断我们的路由是否在白名单里面
    if (!hasLoginAllowRoutes.includes(to.path)) {
      // 3. 如果不在白名单里面，就跳转到登录页面
      next({
        path: loginRoute,
        query: {
          redirect: to.path,
        },
      })
      return
    }
  }
  else {
    // 4. 如果存在，那么我们需要判断用户信息是否存在，如果不存在，就去获取用户信息
    if (!userStore.userInfo && !allowRoutes.includes(to.path)) {
      // 5. 如果用户信息不存在，就去获取用户信息
      try {
        await userStore.getUserInfo()
        // 判断当前页面是不是登录页面，如果是登录页面，就跳转到首页
        // 处理动态路由
        // const currentRouter = await userStore.generateRoutes()

        const currentRouter = await userStore.generateDynamicRoutes()

        if (to.path === loginRoute) {
          next({
            path: '/',
          })
          return
        }
        else if (currentRouter) {
          router.addRoute(currentRouter)
          next({
            ...to,
            replace: true,
          })
          return
        }
      }
      catch (e) {
        if (e instanceof AxiosError && e?.response?.status === 401) {
          return
        }
        else {
          next({
            path: '/error',
            query: {
              redirect: to.path,
            },
          })
          return
        }
      }
    }
  }
  next()
})

router.afterEach((to) => {
  const globalConfig = useGlobalConfig()
  globalConfig.loadingBar?.finish()
  const appStore = useAppStore()
  const title = to.meta?.title
  if (title) {
    const localeTitle = i18n.global.t(title)
    document.title = `${localeTitle} - ${appStore.layout.title}`
  }
  else {
    if (appStore.layout?.title)
      document.title = appStore.layout?.title
  }
})
