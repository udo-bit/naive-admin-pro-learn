import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import SideTitle from '~/layouts/side-menu/side-title.vue'
import SideIcon from '~/layouts/side-menu/side-icon.vue'

export const generateMenu = (routes: RouteRecordRaw[]) => {
  const menus: MenuOption[] = []
  for (const route of routes) {
    const currentMenu: MenuOption = {
      key: route.path,
      label: () => h(SideTitle, { route }),
    }
    if (route.meta?.icon)
      currentMenu.icon = () => h(SideIcon, { icon: route.meta?.icon })

    if (route.children && route.children.length > 0)
      currentMenu.children = generateMenu(route.children)

    menus.push(currentMenu)
  }
  return menus
}
