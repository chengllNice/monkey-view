module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
    "vue/no-use-v-if-with-v-for": ["error", {
      "allowUsingIterationVar": true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    "markdown"
  ]
}
