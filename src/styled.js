let styled

try {
  if (process.env.NODE_ENV === `test` && process.env.SC_NOT_INSTALLED) {
    throw new Error()
  }
  require.resolve(`styled-components`)
  styled = require(`styled-components`).default || require(`styled-components`)
}
catch (e) {
  styled = () => {
    throw new Error(`Cannot find module 'styled-components'`)
  }
}

module.exports = styled
