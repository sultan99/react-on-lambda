import React from 'react'
import {code} from '../src/index.js'

describe(`Spreading import`, () => {
  test(`code`, () => {
    const input = code(`Hello World!`)
    const result = <code>Hello World!</code>

    expect(input).toEqual(result)
  })
})
