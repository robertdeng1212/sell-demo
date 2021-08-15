module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard', // 表示继承标准的规则，使用 vue-cli 创建项目时选的 standard
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0, // 0 表示忽略规格检查
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 强制分号
    'semi': ['error', 'always'],
    // 自动缩进设置为 0，使用 ide 自带的格式化生效
    // 'indent': 0
  }
}
