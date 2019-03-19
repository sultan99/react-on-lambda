const path = require(`path`)
const pkg = require(`./package.json`)

const libraryName = pkg.name
const rootPath = dir => path.resolve(__dirname, dir)

module.exports = {
  mode: `production`,
  output: {
    path: rootPath(`./dist`),
    filename: `${libraryName}.production.js`,
    library: libraryName,
    libraryTarget: `umd`,
    publicPath: `/dist/`,
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      'react': rootPath(`./node_modules/react`),
      'styled-components': rootPath(`./node_modules/styled-components`),
    }
  },
  externals: {
    react: {
      commonjs: `react`,
      commonjs2: `react`,
      amd: `React`,
      root: `React`
    },
    'styled-components': {
      commonjs: `styled-components`,
      commonjs2: `styled-components`,
      amd: `styled`,
      root: `styled`
    }
  }
}
