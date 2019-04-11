import λ from '../src/index.js'

describe(`Function styled-components`, () => {
  const div = λ.div`
    color: read;
    font-size: 18px;
  `
  afterEach(() => {
    jest.resetModules()
  })

  test(`styled-components is installed`, () => {
    process.env.SC_NOT_INSTALLED = false
    const styled = require(`../src/styled`)

    expect(styled).toBeInstanceOf(Function)
  })

  test(`styled-components is not installed`, () => {
    process.env.SC_NOT_INSTALLED = true
    const styled = require(`../src/styled`)

    expect(styled).toThrow(`Cannot find module 'styled-components'`)
  })

  test(`λ.div string)`, () => {
    const {styledComponentId} = div(`Hello World!`).type
    const input = /^sc\-/.test(styledComponentId)

    expect(input).toBe(true)
  })
})
