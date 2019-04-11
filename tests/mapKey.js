import React from 'react'
import λ from '../src/index.js'

describe(`Function mapKey`, () => {
  const items = [
    {id: 2, text: `Foo`},
    {id: 6, text: `Bar`},
  ]

  test(`λ.mapKey(λ.fn, array)`, () => {
    const list = [`Foo`, `Bar`]
    const menu = λ.compose(
      λ.ul,
      λ.mapKey(λ.li)
    )
    const result = (
      <ul>
        {list.map((value, key) =>
          <li key={key}>{value}</li>
        )}
      </ul>
    )

    expect(menu(list)).toEqual(result)
  })

  test(`λ.mapKey(fn(item, index), array[obj])`, () => {
    const menu = λ.compose(
      λ.ul,
      λ.mapKey((item, index) =>
        λ.li({key: item.id}, `${index})${item.text}`)
      )
    )
    const result = (
      <ul>
        {items.map((item, index) =>
          <li key={item.id}>{`${index})${item.text}`}</li>
        )}
      </ul>
    )
    expect(menu(items)).toEqual(result)
  })
})
