import type { FormInst, FormRules } from 'naive-ui'
import type { UserAccountLoginParams } from '~/api/user'

export const useAccountLogin = () => {
  const model = reactive<UserAccountLoginParams>({
    username: null,
    password: null,
  })
  const userStore = useUserStore()

  const loading = ref(false)
  const formRef = ref<FormInst>()

  const { t } = useI18n()

  const rules = reactive<FormRules>({
    username: [
      {
        required: true,
        renderMessage: () => t('login.username.required'),
      },
      {
        max: 20,
        min: 5,
        renderMessage: () => t('login.username.length'),
      },
    ],
    password: [
      {
        required: true,
        renderMessage: () => t('login.password.required'),
      },
      {
        max: 20,
        min: 5,
        renderMessage: () => t('login.password.length'),
      },
    ],
  })

  const router = useRouter()

  const login = async () => {
    // 1.加载loading状态
    loading.value = true
    try {
      // 2.校验表单是否正确
      await formRef.value?.validate()
      // 3.请求接口
      await userStore.login(model)
      // 4.请求成功设置token
      loading.value = false
      // 5.跳转到首页
      const redirect = router.currentRoute.value?.params?.redirect as string
      await router.push(redirect || '/')
      loading.value = false
    }
    catch (e) {
      loading.value = false
    }
  }

  return {
    loading,
    model,
    formRef,
    rules,
    login,
  }
}
