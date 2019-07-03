import React from 'react'
import λ from '../src/index.js'

describe(`Function nest`, () => {
  test(`λ.nest math functions`, () => {
    const subtract = b => a => a - b
    const square = x => x * x
    const addOne = x => x + 1
    const input = λ.nest(
      subtract(1),
      square,
      addOne,
      3
    )

    expect(input).toBe(15)
  })

  test(`λ.nest react elements`, () => {
    const input = λ.nest(
      λ.h1({className: `title`}),
      λ.p,
      λ.span(`Read more`),
    )
    const result = (
      <h1 className='title'>
        <p><span>Read more</span></p>
      </h1>
    )

    expect(input).toEqual(result)
  })

  test(`λ.nest nested in react element`, () => {
    const input = λ.div(
      λ.nest(
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

  test(`λ.nest all functions`, () => {
    const input = λ.nest(
      λ.div({className: `layout`}),
      λ.div({className: `box`}),
      λ.div({id: 123}),
    )
    const result = (
      <div className='layout'>
        <div className="box">
          <div id={123}/>
        </div>
      </div>
    )

    expect(input).toEqual(result)
  })
})
