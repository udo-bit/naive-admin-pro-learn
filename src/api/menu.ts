import type { MenuInfo } from './user'

export const systemMenuUrl = '/menu'

export interface CommonProTableParams {
  page?: number
  pageSize?: number
}

export type SystemMenuParams = Partial<MenuInfo> & CommonProTableParams

export interface SystemMenuResult {
  data: MenuInfo[]
  total: number
}

export const systemMenuApi = (params?: SystemMenuParams) => {
  return useGet<SystemMenuParams, SystemMenuResult>(systemMenuUrl, params)
}
