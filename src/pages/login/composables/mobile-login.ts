import type { FormInst, FormRules } from 'naive-ui'
import type { UserMobileLoginParams } from '~/api/user'
import { userSendCodeApi } from '~/api/user'

export const useMobileLogin = () => {
  const mLoading = ref(false)
  const mModel = reactive<UserMobileLoginParams>({
    mobile: null,
    code: null,
    type: 'mobile',
  })
  const mFormRef = ref<FormInst>()
  const userStore = useUserStore()
  const counter = ref(120)
  const counterState = ref(false)
  const router = useRouter()
  const message = useMessage()
  const { t } = useI18n()

  const mRules = reactive<FormRules>({
    mobile: [
      {
        key: 'mobile',
        required: true,
        renderMessage: () => t('login.mobile.required'),
      },
      {
        key: 'mobile',
        pattern: /^1[3456789]\d{9}$/,
        renderMessage: () => t('login.mobile.rule'),
      },
    ],
    code: [
      {
        required: true,
        renderMessage: () => t('login.mobile.verification-code.required'),
      },
      {
        max: 6,
        min: 6,
        renderMessage: () => t('login.mobile.verification-code.rule'),
      },
    ],
  })

  const startCounter = () => {
    counter.value = 120
    const timer = setInterval(() => {
      if (counter.value <= 0) {
        counterState.value = false
        clearInterval(timer)
      }
      else {
        counter.value--
      }
    }, 1000)
  }

  const sendCode = async () => {
    const msgIns = message.loading(t('login.mobile.verification-code.loading'))
    try {
      await mFormRef.value?.validate(undefined, rule => rule?.key === 'mobile')
      await userSendCodeApi({ mobile: mModel.mobile })
      counterState.value = true
      msgIns.destroy()
      message.success(t('login.mobile.verification-code.success'))
      startCounter()
    }
    catch (e) {
      msgIns.destroy()
    }
  }

  const mLogin = async () => {
    // 1.加载loading状态
    mLoading.value = true
    try {
      // 2.校验表单是否正确
      await mFormRef.value?.validate()
      // 3.请求接口
      await userStore.login(mModel)
      // 4.请求成功设置token
      mLoading.value = false
      // 5.跳转到首页
      const redirect = router.currentRoute.value?.params?.redirect as string
      await router.push(redirect || '/')
      mLoading.value = false
    }
    catch (e) {
      mLoading.value = false
    }
  }

  return {
    mLoading,
    mModel,
    mFormRef,
    mRules,
    mLogin,
    sendCode,
    counterState,
    counter,
  }
}
