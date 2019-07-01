import React from 'react'
import λ from '../src/index.js'

describe(`Function compose`, () => {
  test(`λ.compose math functions`, () => {
    const subtract = b => a => a - b
    const square = x => x * x
    const addOne = x => x + 1
    const calculate = λ.compose(
      subtract(1),
      square,
      addOne
    )
    const input = calculate(1)
    calculate(1) // test for mutations

    expect(input).toBe(3)
  })

  test(`λ.compose react elements`, () => {
    const readMore = λ.compose(
      λ.h1({className: `title`}),
      λ.a
    )
    const input = readMore(`Read more`)
    const result = (
      <h1 className='title'>
        <a>Read more</a>
      </h1>
    )
    readMore(`Read more`) // test for mutations

    expect(input).toEqual(result)
  })

  test(`λ.compose nested in react element`, () => {
    const input = λ.div(
      λ.compose(
        λ.h1({className: `title`}),
        λ.a({href: `_blank`})
      )
    )
    const result = (
      <div>
        <h1 className='title'>
          <a href="_blank"/>
        </h1>
      </div>
    )

    expect(input).toEqual(result)
  })

  test(`λ.compose narity`, () => {
    const title = λ.compose(
      λ.h1({className: `title`}),
      λ.a
    )
    const result = (
      <h1 className='title'>
        <a className="no-link">
          Read more
        </a>
      </h1>
    )
    const input = title({className: `no-link`}, `Read more`)
    expect(input).toEqual(result)
  })
})
