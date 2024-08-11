import 'vue-router'

declare module 'vue-router'{
  interface RouteMeta {
    title?: string
    id?: number
    pid?: number
    icon?: string
    target?: '_blank' | '_self' | '_parent' | '_top'
    // 是否保活的参数
    keepAlive?: boolean
  }
}
