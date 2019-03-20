const path = require(`path`)

const rootPath = dir => path.resolve(__dirname, dir)

module.exports = {
  mode: `production`,
  output: {
    path: rootPath(`./dist`),
    filename: `react-on-lambdaλ.min.js`,
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
