import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'

const baseSrc = fileURLToPath(new URL('./src', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            naiveUI: ['naive-ui'],
            antdIcon: ['@vicons/antd'],
            lodash: ['lodash-es', '@vueuse/core'],
            vue: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
          },
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: false,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
    },
    resolve: {
      alias: {
        '~': baseSrc,
        '~@': baseSrc,
        '@': baseSrc,
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          'pinia',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
        dts: 'types/auto-imports.d.ts',
        dirs: ['src/stores', 'src/composables'],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: 'types/components.d.ts',
        dirs: ['src/components'],
      }),
      Unocss(),
    ],
  }
})
