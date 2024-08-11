import type { IncludeNull } from '~/utils/types'

export interface UserInfo {
  id: number
  username: string
  nickname?: string
  email?: string
  mobile?: string
  avatar?: string
  signature?: string
  realName?: string
  money?: number
  birth?: string
}

export interface MenuInfo {
  // 主键
  id: number
  // 父级id
  pid?: number
  // 路由地址
  path: string
  name?: string
  title: string
  // 组件地址
  component?: string
  // 图标
  icon?: string
  // 重定向地址
  redirect?: string
  // 是否保活
  keepAlive?: boolean
}

export const userLoginUrl = '/user/login'
export const userSendCodeUrl = '/user/send-code'
export const userGetInfoUrl = '/user/info'
// export const userGetInfoUrl = '/test/401'
// export const userMenusUrl = '/user/menus'
export const userMenusUrl = '/user/menus1'
// export const userMenusUrl = '/user/menu-lang'

export interface UserAccountLoginParams {
  username: IncludeNull<string>
  password: IncludeNull<string>
  captcha?: IncludeNull<string>
  rememberMe?: IncludeNull<any>
}

export interface UserMobileLoginParams {
  mobile: IncludeNull<string>
  code: IncludeNull<string>
  type: 'mobile'
  rememberMe?: IncludeNull<any>
}

export interface UserLoginResult {
  token: string
}

export const userLoginApi = (params: UserAccountLoginParams | UserMobileLoginParams) => {
  return usePost<UserMobileLoginParams | UserAccountLoginParams, UserLoginResult>(userLoginUrl, params)
}

export type UserSendCodeParams = Pick<UserMobileLoginParams, 'mobile'>
export const userSendCodeApi = (params: UserSendCodeParams) => {
  return usePost<UserSendCodeParams, any>(userSendCodeUrl, params)
}

export const userGetInfoApi = () => {
  return useGet<any, UserInfo>(userGetInfoUrl)
}

export const userGetMenusApi = () => {
  return useGet<any, MenuInfo[]>(userMenusUrl)
}
