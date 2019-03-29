let styled

try {
  require.resolve(`styled-components`)
  styled = require(`styled-components`).default || require(`styled-components`)
}
catch {
  styled = () => {
    throw new Error(`Module not found: styled-components`)
  }
}

export default styled
