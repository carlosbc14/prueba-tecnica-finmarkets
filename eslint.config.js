import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'

export default [
  eslint.configs.recommended,
  prettier,
  {
    files: ['**/*.js'],
    languageOptions: {
      env: { node: true },
    },
    rules: {},
  },
]
