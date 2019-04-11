import λ from '../src/index.js'

describe(`Function curry`, () => {
  test(`λ.curry(x)`, () => {
    const f = x => `f: ${x}!`
    const g = λ.curry(f)

    expect(f(`Boo`)).toBe(g(`Boo`))
  })

  test(`λ.curry(x)(y)(z)`, () => {
    const f = (x, y, z) => `f: ${x}, ${y}, ${z}!`
    const g = λ.curry(f)
    const input = g(1)(2)(3)

    expect(input).toBe(f(1, 2, 3))
  })

  test(`λ.curry(x)(y, z)`, () => {
    const f = (x, y, z) => `f: ${x}, ${y}, ${z}!`
    const g = λ.curry(f)
    const input = g(1)(2, 3)

    expect(input).toBe(f(1, 2, 3))
  })

  test(`λ.curry(x, y, z)`, () => {
    const f = (x, y, z) => `f: ${x}, ${y}, ${z}!`
    const g = λ.curry(f)
    const input = g(1, 2, 3)

    expect(input).toBe(f(1, 2, 3))
  })

  test(`λ.curry(x, null, z)`, () => {
    const f = (x, y, z) => `f: ${x}, ${y}, ${z}!`
    const g = λ.curry(f)
    const input = g(1, null, 3)

    expect(input).toBe(f(1, null, 3))
  })

  test(`λ.curry(...args)`, () => {
    const f = (...args) => args.length
    const g = λ.curry(f)
    const input = g(1)

    expect(input).toBe(1)
  })
})
