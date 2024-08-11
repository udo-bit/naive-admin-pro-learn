import { dateZhCN, zhCN } from 'naive-ui'
import global from './global/zh-CN'
import pages from './pages/zh-CN'

export default {
  ...global,
  ...pages,
  naiveUI: {
    locale: zhCN,
    dateLocale: dateZhCN,
  },
}
