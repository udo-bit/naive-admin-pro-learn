import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import '~/assets/styles/index.css'
import 'uno.css'
import router from '~/routes'
import i18n from '~/locales'
import '~/routes/router-guard'

// console.log(import.meta.env.VITE_APP_BASE)

const pinia = createPinia()

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(pinia)

app.mount('#app')
