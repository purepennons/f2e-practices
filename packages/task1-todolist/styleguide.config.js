const path = require('path');

module.exports = {
  require: [
    path.join(__dirname, 'src/styles/base.scss'),
    path.join(__dirname, 'src/utils/fontawesome.js')
  ],
  components: 'src/components/**/[A-Z]*.{js,jsx}',
  skipComponentsWithoutExample: true
};
