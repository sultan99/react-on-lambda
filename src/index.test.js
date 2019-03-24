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

  test(`λ.div(array)`, () => {
    const items = [`milk`, `tea`]
    const menu = λ.compose(
      λ.ul,
      λ.mapKey(λ.li),
    )
    const result = (
      <ul>
        {items.map((item, key) =>
          <li key={key}>{item}</li>
        )}
      </ul>
    )

    expect(menu(items)).toEqual(result)
  })

  test(`λ.div(element, array, λ.fn)`, () => {
    const tags = [`react`, `λambda`]
    const input = λ.div(
      λ.h1(`Tag Cloud`),
      λ.mapKey(λ.span, tags),
      λ.div({className: `footer`})
    )
    const result = (
      <div>
        <h1>Tag Cloud</h1>
        {tags.map((item, key) =>
          <span key={key}>{item}</span>
        )}
        <div className='footer'/>
      </div>
    )

    expect(input).toEqual(result)
  })
})

describe(`Helper function compose`, () => {
  test(`λ.compose() => fn`, () => {
    expect(typeof λ.compose()).toBe(`function`)
  })

  test(`λ.compose math functions`, () => {
    const subtract = b => a => a - b
    const square = x => x * x
    const addOne = x => x + 1
    const input = λ.compose(
      subtract(1),
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

describe(`Helper function mapKey`, () => {
  const items = [`home`, `about`]

  test(`λ.mapKey(λ.fn, array)`, () => {
    const menu = λ.ul(
      λ.mapKey(λ.li, items)
    )
    const result = (
      <ul>
        {items.map((item, index) =>
          <li key={index}>{item}</li>
        )}
      </ul>
    )

    expect(menu).toEqual(result)
  })

  test(`λ.mapKey(λ.fn)(array)`, () => {
    const menu = λ.ul(
      λ.mapKey(λ.li)(items)
    )
    const result = (
      <ul>
        {items.map((item, index) =>
          <li key={index}>{item}</li>
        )}
      </ul>
    )

    expect(menu).toEqual(result)
  })
})

describe(`Helper function pluck`, () => {
  const users = [
    {id: 123, name: `foo`},
    {id: 124, name: `bar`}
  ]
  const flatData = [[`foo`, 123], [`bar`, 124]]

  test(`λ.pluck(value, key, list)`, () => {
    const input = λ.pluck(`name`, `id`, users)

    expect(input).toEqual(flatData)
  })

  test(`λ.pluck(value, key)(list)`, () => {
    const input = λ.pluck(`name`, `id`)

    expect(input(users)).toEqual(flatData)
  })

  test(`λ.pluck(value, key)(list) with compose`, () => {
    const input = λ.compose(
      λ.ul,
      λ.mapKey(λ.li),
      λ.pluck(`name`, `id`)
    )
    const result = (
      <ul>
        {users.map(user =>
          <li key={user.id}>{user.name}</li>
        )}
      </ul>
    )

    expect(input(users)).toEqual(result)
  })

  test(`λ.pluck(value)(list) with compose`, () => {
    const input = λ.compose(
      λ.ul,
      λ.mapKey(λ.li),
      λ.pluck(`name`)
    )
    const result = (
      <ul>
        {users.map((user, index) =>
          <li key={index}>{user.name}</li>
        )}
      </ul>
    )

    expect(input(users)).toEqual(result)
  })
})

describe(`Helper function showIf`, () => {
  const OK = true
  const NO = false

  test(`λ.showIf(true, a) -> a`, () => {
    const input = λ.showIf(OK, λ.span(`Hello World!`))
    const result = <span>Hello World!</span>

    expect(input).toEqual(result)
  })

  test(`λ.showIf(false, a) -> null`, () => {
    const input = λ.showIf(NO, λ.span(`Hello World!`))
    const result = null

    expect(input).toEqual(result)
  })

  test(`λ.showIf(true, a, b) -> a`, () => {
    const input = λ.showIf(OK,
      λ.span(`Hello World!`),
      λ.span(`Loading...`)
    )
    const result = <span>Hello World!</span>

    expect(input).toEqual(result)
  })

  test(`λ.showIf(false, a, b) -> b`, () => {
    const input = λ.showIf(NO,
      λ.span(`Hello World!`),
      λ.span(`Loading...`)
    )
    const result = <span>Loading...</span>

    expect(input).toEqual(result)
  })
})
