import mist from '@mistjs/eslint-config'

export default mist({
  rules: {
    'antfu/top-level-function': 0,
    'no-console': 0,
    'ts/ban-types': 0,
    'unused-imports/no-unused-vars': 0,
    'node/prefer-global/process': 0,
  },
  ignores: [
    'types/auto-imports.d.ts',
    'types/components.d.ts',
  ],
})
