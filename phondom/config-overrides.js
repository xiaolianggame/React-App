const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')

const path = require('path')

module.exports = override(
fixBabelImports('import', {
  libraryName: 'antd-mobile',
 style: 'css',
  }),
  addWebpackAlias({
    ['@']: path.join(__dirname, 'src'),
    ['containers']: path.join(__dirname, 'src/containers'),
    ['components']: path.join(__dirname, 'src/components'),
    ['ajax']: path.join(__dirname, 'src/ajax'),
    ['assets']: path.join(__dirname, 'src/assets'),
    ['unchanging']: path.join(__dirname, 'src/unchanging')
  })
  );