let styled

try {
  if (process.env.NODE_ENV === `test` && process.env.SC_NOT_INSTALLED) {
    throw new Error()
  }
  require.resolve(`styled-components`)
  styled = require(`styled-components`).default || require(`styled-components`)
}
catch {
  styled = () => {
    throw new Error(`Module not found: styled-components`)
  }
}

export default styled
