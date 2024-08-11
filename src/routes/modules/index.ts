import Dashboard from './dashboard'
import Menu from './menu'

const Home = () => import('~/pages/index.vue')

export default {
  Home,
  ...Dashboard,
  ...Menu,
}
