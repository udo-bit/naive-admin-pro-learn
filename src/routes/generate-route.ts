import type { RouteRecordRaw } from 'vue-router'
import { omit } from 'lodash-es'
import modules from './modules'
import type { MenuInfo } from '~/api/user'
import { userGetMenusApi } from '~/api/user'
import { ROOT_ROUTE_REDIRECT_PATH, rootRouter } from '~/routes/dynamic-routes'

const defineComponent: Record<string, any> = {
  RouteView: () => import('~/layouts/base-layout/route-view.vue'),
  BlankView: () => import('~/layouts/base-layout/blank-view.vue'),
}

const getComponent = (component?: string) => {
  if (!component)
    return defineComponent.BlankView

  if (component in defineComponent)
    return defineComponent[component]

  return (modules as Record<string, any>)[component]
}

const flatRouteData = (routes: RouteRecordRaw[]) => {
  const flatRoutes: RouteRecordRaw[] = []
  for (const route of routes) {
    flatRoutes.push(omit(route, ['children']) as RouteRecordRaw)
    if (route.children && route.children.length > 0)
      flatRoutes.push(...flatRouteData(route.children))
  }
  return flatRoutes
}

export const flatRoutes = (routes: RouteRecordRaw[]) => {
  const rootRoute: RouteRecordRaw = {
    path: '/',
    name: 'root',
    component: defineComponent.RouteView,
    redirect: ROOT_ROUTE_REDIRECT_PATH,
    children: [],
  }
  rootRoute.children = flatRouteData(routes)
  return rootRoute
}

const generator = (menuInfo: MenuInfo[], pid?: number) => {
  const routes: RouteRecordRaw[] = []
  let currentMenus: MenuInfo[] = []
  if (!pid)
    currentMenus = menuInfo.filter(item => !item.pid)
  else currentMenus = menuInfo.filter(item => item.pid === pid)

  for (const currentMenu of currentMenus) {
    const currentRoute: RouteRecordRaw = {
      path: currentMenu.path,
      name: currentMenu.name,
      redirect: currentMenu.redirect,
      component: getComponent(currentMenu.component),
      meta: {
        title: currentMenu.title,
        id: currentMenu.id,
        pid: currentMenu.pid,
        icon: currentMenu.icon,
        keepAlive: currentMenu.keepAlive,
      },
      children: generator(menuInfo, currentMenu.id),
    }
    if (!currentRoute.children || currentRoute.children.length < 1)
      delete (currentRoute as RouteRecordRaw).children
    routes.push(currentRoute)
  }

  return routes
}

export const generateRoute = async () => {
  const { data } = await userGetMenusApi()
  if (data) {
    const routes = generator(data)
    return {
      ...rootRouter,
      children: routes,
    }
  }
}
