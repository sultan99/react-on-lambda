import React, {Fragment} from 'react'
import λ, {extractChilds} from './index.js'

// describe(`Helper functions`, () => {
//   test(`extractChilds(fn)`, () => {
//     const input = extractChilds([λ.h1])
//     const result = <h1></h1>
//
//     expect(input).toEqual(result)
//   })
//
//   test(`extractChilds(string, node, fn)`, () => {
//     const input = extractChilds([
//       `just text`,
//       λ.h1(`title`),
//       λ.p
//     ])
//     const result = (
//       <Fragment>
//         just text
//         <h1>title</h1>
//         <p></p>
//       </Fragment>
//     )
//
//     expect(input).toEqual(result)
//   })
// })

describe(`Core functions`, () => {
  test(`λ.div -> fn`, () => {
    expect(typeof λ.div).toBe(`function`)
  })

  test(`λ.div() -> empty element`, () => {
    expect(λ.div()).toEqual(<div/>)
  })

  test(`λ.div(string)`, () => {
    const input = λ.div(`Hello world!`)
    const result = <div>Hello world!</div>

    expect(input).toEqual(result)
  })

  test(`λ.div({props}) -> fn`, () => {
    const div = λ.div({className: `app`})
    const result = <div className = 'app'/>

    expect(typeof div).toBe(`function`)
    expect(div()).toEqual(result)
  })

  test(`λ.div(λ.fn)`, () => {
    const input = λ.div(λ.span({id: 123}))
    const result = <div><span id={123}/></div>

    expect(input).toEqual(result)
  })

  test(`λ.div(element)`, () => {
    const input = λ.div(λ.span(`Hello`))
    const result = <div><span>Hello</span></div>

    expect(input).toEqual(result)
  })

  test(`λ.div({props}, string)`, () => {
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

  test(`λ.div([λ.fn, elment])`, () => {
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
