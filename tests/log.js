import λ from '../src/index.js'

describe(`Function log`, () => {
  test(`input -> λ.log() -> input`, () => {
    const input = λ.compose(
      λ.log()
    )
    const result = `Hello World!`

    expect(input(result)).toBe(result)
  })

  test(`input -> λ.log('test') -> input`, () => {
    const input = λ.compose(
      λ.log(`test`)
    )
    const result = `Hello World!`

    expect(input(result)).toBe(result)
  })
})
