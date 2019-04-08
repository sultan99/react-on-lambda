const path = require(`path`)

const rootPath = dir => path.resolve(__dirname, dir)

module.exports = {
  mode: `production`,
  output: {
    path: rootPath(`./dist`),
    filename: `react-on-lambda.min.js`,
    library: `λ`,
    libraryTarget: `umd`,
    publicPath: `/dist`,
    umdNamedDefine: false
  },
  resolve: {
    alias: {
      'react': rootPath(`./node_modules/react`),
      'styled-components': rootPath(`./node_modules/styled-components`),
    }
  },
  externals: {
    react: {
      root: `React`,
      commonjs: `react`,
      commonjs2: `react`,
      amd: `React`,
    },
    'styled-components': {
      root: `styled`,
      commonjs: `styled-components`,
      commonjs2: `styled-components`,
      amd: `styled`,
    }
  }
}
