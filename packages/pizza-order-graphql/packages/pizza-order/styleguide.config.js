const path = require('path')

module.exports = {
  require: ['normalize.css', path.join(__dirname, './src/styles/theme.css')],
  components: 'src/components/**/[A-Z]*.js',
}
