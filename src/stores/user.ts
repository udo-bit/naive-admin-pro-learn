import type { RouteRecordRaw } from 'vue-router'
import type { UserAccountLoginParams, UserInfo, UserMobileLoginParams } from '~/api/user'
import { userGetInfoApi, userLoginApi } from '~/api/user'
import { useGlobalConfig } from '~/composables/global-config'
import i18n from '~/locales'
import router from '~/routes'
import { dynamicRoutes, rootRouter } from '~/routes/dynamic-routes'
import { flatRoutes, generateRoute } from '~/routes/generate-route'
import { generateMenu } from '~/routes/generate-menu'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()
  const token = useAuthorization()
  const { message } = useGlobalConfig()
  const t = i18n.global.t
  const routerRecords = ref<RouteRecordRaw[]>()

  const menusData = computed(() => generateMenu(routerRecords.value ?? []))

  const setUserInfo = (info: UserInfo | undefined) => {
    userInfo.value = info
  }

  const setToken = (key: string | null) => {
    token.value = key
  }

  const login = async (params: UserAccountLoginParams | UserMobileLoginParams) => {
    const { data } = await userLoginApi(params)
    if (data?.token)
      setToken(data.token)
  }

  const getUserInfo = async () => {
    const { data } = await userGetInfoApi()
    if (data)
      setUserInfo(data)
  }

  const logout = async () => {
    setToken(null)
    setUserInfo(undefined)
    message?.success(t('global.layout.header.right.logout.success'))
    await router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path,
      },
    })
  }

  const generateRoutes = async () => {
    const flatRouteData = flatRoutes(dynamicRoutes)
    const currentRouter = {
      ...rootRouter,
      children: [flatRouteData],
    }
    routerRecords.value = dynamicRoutes
    return currentRouter
  }

  const generateDynamicRoutes = async () => {
    const routerData = await generateRoute()
    if (routerData) {
      routerRecords.value = routerData.children
      const flatRouteData = flatRoutes(routerData.children)
      routerData.children = [flatRouteData]
    }

    return routerData
  }

  return {
    userInfo,
    token,
    routerRecords,
    menusData,
    setUserInfo,
    getUserInfo,
    login,
    logout,
    generateRoutes,
    generateDynamicRoutes,
  }
})
