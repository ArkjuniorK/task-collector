module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
}
