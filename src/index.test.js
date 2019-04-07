import React from 'react'
import λ from './index.js'

describe(`Core functions`, () => {
  test(`λ(comp) -> fn`, () => {
    const title = () => λ.h1(`Hello World!`)

    expect(λ(title)).toBeInstanceOf(Function)
  })

  test(`λ(comp, props) -> fn`, () => {
    const title = props => λ.h1(props, `Hello World!`)

    expect(λ(title, {id: 123})).toBeInstanceOf(Function)
  })

  test(`λ(comp, props, string)`, () => {
    const Title = props => <h1 {...props}/>
    const result = <Title id={123}>Hello World!</Title>

    expect(λ(Title, {id: 123}, `Hello World!`)).toEqual(result)
  })

  test(`λ(comp)(props, string)`, () => {
    const Title = props => <h1 {...props}/>
    const result = <Title id={123}>Hello World!</Title>

    expect(λ(Title)({id: 123}, `Hello World!`)).toEqual(result)
  })

  test(`λ.div -> fn`, () => {
    expect(λ.div).toBeInstanceOf(Function)
  })

  test(`λ.div(props) -> fn`, () => {
    const div = λ.div({className: `app`})

    expect(div).toBeInstanceOf(Function)
  })

  test(`λ.div(props)(props) -> fn`, () => {
    const div = λ.div({className: `app`})

    expect(div({id: 123})).toBeInstanceOf(Function)
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

  test(`λ.div({children})`, () => {
    const input = λ.div({children: `Hello`})
    const result = <div>Hello</div>

    expect(input).toEqual(result)
  })

  test(`λ.div(λ.fn)`, () => {
    const input = λ.div(λ.span({id: 123}))
    const result = <div><span id={123}/></div>

    expect(input).toEqual(result)
  })

  test(`λ.div(λ.fn, element)`, () => {
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

  test(`λ.fragment`, () => {
    const input = λ.fragment(
      λ.h1(`foo`),
      λ.p(`bar`)
    )
    const result = (
      <React.Fragment>
        <h1>foo</h1>
        <p>bar</p>
      </React.Fragment>
    )

    expect(input).toEqual(result)
  })
})

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

describe(`Function compose`, () => {
  test(`λ.compose() => fn`, () => {
    expect(λ.compose()).toBeInstanceOf(Function)
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
    input(1) // test for mutations

    expect(input(1)).toBe(3)
  })

  test(`λ.compose react elements`, () => {
    const input = λ.compose(
      λ.h1({className: `title`}),
      λ.a
    )
    const result = (
      <h1 className='title'>
        <a>Read more</a>
      </h1>
    )
    input(`Read more`) // test for mutations

    expect(input(`Read more`)).toEqual(result)
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

  test(`Key auto-insert`, () => {
    const list = λ.mapKey(item =>
      λ.li(item.text)
    )
    const result = items.map((item, key) =>
      <li key={key}>{item.text}</li>
    )

    expect(list(items)).toEqual(result)
  })

  test(`Auto-insert should not override keys`, () => {
    const data = [
      {id: 123, name: `Albert`, surname: `Einstein`},
      {id: 124, name: `Daimaou `, surname: `Kosaka`},
    ]
    const userList = λ.compose(
      λ.ul,
      λ.mapKey(λ.li),
      λ.mapProps({key: `id`, children: `name`})
    )
    const result = (
      <ul>
        {data.map(user =>
          <li key={user.id}>
            {user.name}
          </li>
        )}
      </ul>
    )

    expect(userList(data)).toEqual(result)
  })
})

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

  test(`λ.mapProps(maps[fn], array)`, () => {
    const input = λ.mapProps({
      key: `id`, children: `text`,
      selected: item => item.id === 6
    })
    const result = [
      {key: 2, children: `Foo`, selected: false},
      {key: 6, children: `Bar`, selected: true},
    ]

    expect(input(items)).toEqual(result)
  })
})

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
    const styled = require(`./styled`).default

    expect(styled).toBeInstanceOf(Function)
  })

  test(`styled-components is not installed`, () => {
    process.env.SC_NOT_INSTALLED = true
    const styled = require(`./styled`).default

    expect(styled).toThrow(`Module not found: styled-components`)
  })

  test(`λ.div string)`, () => {
    const {styledComponentId} = div(`Hello World!`).type
    const input = /^sc\-/.test(styledComponentId)

    expect(input).toBe(true)
  })
})
