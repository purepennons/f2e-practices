const path = require('path')

module.exports = {
  require: [path.join(__dirname, 'src/styles/base.scss')],
  components: 'src/components/**/[A-Z]*.{js,jsx}',
  skipComponentsWithoutExample: true
}
