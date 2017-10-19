module.exports = {
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  extends: [
    'angular'
  ],
  rules: {
    'eol-last': 0,
    'indent': ['warn', 4],
    'angular/log': 0,
    'angular/no-service-method': 0,
    'angular/window-service': 0,
    'angular/typecheck-number': 0
  }
}
