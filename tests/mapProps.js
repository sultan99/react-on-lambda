import λ from '../src/index.js'

describe(`Function mapProps`, () => {
  const items = [
    {id: 2, text: `Foo`},
    {id: 6, text: `Bar`},
  ]

  test(`λ.mapProps(maps, array)`, () => {
    const input = λ.mapProps(
      {key: `id`, children: `text`}, items
    )
    const result = [
      {key: 2, children: `Foo`},
      {key: 6, children: `Bar`},
    ]

    expect(input).toEqual(result)
  })

  test(`λ.mapProps(maps)(array)`, () => {
    const input = λ.mapProps({key: `id`, children: `text`})
    const result = [
      {key: 2, children: `Foo`},
      {key: 6, children: `Bar`},
    ]

    expect(input(items)).toEqual(result)
  })
})
