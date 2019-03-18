import React from 'react'
import λ from './index.js'

describe(`Core functions`, () => {
  test(`λ.div -> fn`, () => {
    expect(typeof λ.div).toBe(`function`)
  })

  test(`λ.div(props) -> fn`, () => {
    const div = λ.div({className: `app`})

    expect(typeof div).toBe(`function`)
  })

  test(`λ.div(props)`, () => {
    const div = λ.div({className: `app`})
    const result = <div className = 'app'/>

    expect(div()).toEqual(result)
  })

  test(`λ.div(props, string)`, () => {
    const input = λ.div({className: `app`},
      `Hello world!`
    )
    const result = (
      <div className = 'app'>
        Hello world!
      </div>
    )

    expect(input).toEqual(result)
  })

  test(`λ.div() -> empty element`, () => {
    expect(λ.div()).toEqual(<div/>)
  })

  test(`λ.div(string)`, () => {
    const input = λ.div(`Hello world!`)
    const result = <div>Hello world!</div>

    expect(input).toEqual(result)
  })

  test(`λ.div(element)`, () => {
    const input = λ.div(λ.span(`Hello`))
    const result = <div><span>Hello</span></div>

    expect(input).toEqual(result)
  })

  test(`λ.div(λ.fn)`, () => {
    const input = λ.div(λ.span({id: 123}))
    const result = <div><span id={123}/></div>

    expect(input).toEqual(result)
  })

  test(`λ.div(λ.fn, elment)`, () => {
    const input = λ.div(
      λ.p,
      λ.span(`Hello`)
    )
    const result = (
      <div>
        <p></p>
        <span>Hello</span>
      </div>
    )

    expect(input).toEqual(result)
  })

  test(`λ.div(map)`, () => {
    const items = [`milk`, `tea`]
    const input = λ.ul(
      items.map((item, key) => λ.li({key}, item))
    )
    const result = (
      <ul>
        {items.map((item, key) => <li key={key}>{item}</li>)}
      </ul>
    )

    expect(input).toEqual(result)
  })
})

describe(`Helper functions`, () => {
  test(`λ.compose() => fn`, () => {
    expect(typeof λ.compose()).toBe(`function`)
  })

  test(`λ.compose math functions`, () => {
    const minusOne = x => x - 1
    const square = x => x * x
    const addOne = x => x + 1
    const input = λ.compose(
      minusOne,
      square,
      addOne
    )

    expect(input(1)).toBe(3)
  })

  test(`λ.compose rect elements`, () => {
    const input = λ.compose(
      λ.h1({className: `title`}),
      λ.a
    )
    const result = (
      <h1 className='title'>
        <a>Read more</a>
      </h1>
    )

    expect(input(`Read more`)).toEqual(result)
  })
})
