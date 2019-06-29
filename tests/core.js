import React from 'react'
import λ from '../src/index.js'

describe(`Core functions`, () => {
  test(`λ(comp) -> fn`, () => {
    const title = () => λ.h1(`Hello World!`)
    const input = λ(title)

    expect(input).toBeInstanceOf(Function)
  })

  test(`λ(comp, props) -> fn`, () => {
    const title = props => λ.h1(props, `Hello World!`)
    const input = λ(title, {id: 123})

    expect(input).toBeInstanceOf(Function)
  })

  test(`λ(comp)(props)(props) -> fn)`, () => {
    const Title = props => <h1 {...props}/>
    const input = λ(Title)({className: `title`})({id: 123})

    expect(input).toBeInstanceOf(Function)
  })

  test(`λ(comp)(props)(string)`, () => {
    const Title = props => <h1 {...props}/>
    const input = λ(Title)({id: 123})(`Hello World!`)
    const result = <Title id={123}>Hello World!</Title>

    expect(input).toEqual(result)
  })

  test(`λ(comp)(props, string)`, () => {
    const Title = props => <h1 {...props}/>
    const input = λ(Title)({id: 123}, `Hello World!`)
    const result = <Title id={123}>Hello World!</Title>

    expect(input).toEqual(result)
  })

  test(`λ.div -> fn`, () => {
    expect(λ.div).toBeInstanceOf(Function)
  })

  test(`λ.div(props) -> fn`, () => {
    const div = λ.div({className: `app`})

    expect(div).toBeInstanceOf(Function)
  })

  test(`λ.div(props)(props) -> fn`, () => {
    const div = λ.div({className: `app`})({id: 123})

    expect(div).toBeInstanceOf(Function)
  })

  test(`λ.div(props)()`, () => {
    const div = λ.div({className: `app`})
    const input = div()
    const result = <div className = 'app'/>

    expect(input).toEqual(result)
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

  test(`λ.div({children: string})`, () => {
    const input = λ.div({children: `Hello`})
    const result = <div>Hello</div>

    expect(input).toEqual(result)
  })

  test(`λ.div({children: [string]})`, () => {
    const input = λ.div({children: [`Hello`]})
    const result = <div>{[`Hello`]}</div>

    expect(input).toEqual(result)
  })

  test(`λ.div({children: array})`, () => {
    const columns = [
      {title: `Name`, dataIndex: `name`},
      {title: `Age`, dataIndex: `age`},
      {title: `Address`, dataIndex: `address`}
    ]
    const header = λ.compose(
      λ.thead,
      λ.tr,
      λ.mapKey(λ.th),
      λ.mapProps({
        key: `dataIndex`,
        children: `title`
      })
    )
    const input = header(columns)
    const result = (
      <thead>
        <tr>
          {columns.map(column =>
            <th key={column.dataIndex}>
              {column.title}
            </th>
          )}
        </tr>
      </thead>
    )

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
    const input = menu(items)
    const result = (
      <ul>
        {items.map((item, key) =>
          <li key={key}>{item}</li>
        )}
      </ul>
    )

    expect(input).toEqual(result)
  })

  test(`λ.div(array[fn])`, () => {
    const div = λ.compose(
      λ.div,
      () => [
        λ.span({key: 1}),
        λ.span({key: 2})
      ],
    )
    const input = div()
    const result = (
      <div>
        <span key={1}/>
        <span key={2}/>
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

  test(`Reuse same component`, () => {
    const box = λ.div({className: `box`})
    const boxes = λ.compose(
      box({height: `10px`}),
      box({width: `15px`}),
    )
    const result = (
      <div className="box" height="10px">
        <div className="box" width="15px">
          Hello world!
        </div>
      </div>
    )

    expect(boxes(`Hello world!`)).toEqual(result)
  })
})
