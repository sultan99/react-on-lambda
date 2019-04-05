import React from 'react'
import styled from './styled'

const isItProps = props => (
  props !== null
  && typeof props === `object`
  && !props.$$typeof
  && !Array.isArray(props)
)

const callFns = args => (
  args && args.map(arg =>
    typeof arg === `function` ? arg() : arg
  )
)

const curry = fn => {
  const next = (...x) => fn.length <= x.length
    ? fn(...x) : (...y) => next(...x, ...y)
  return next
}

const mapArray = curry((el, items) =>
  items.map((item, index) => {
    const props = {key: index}
    const children = item
    return el(props, children)
  })
)

const mapObject = curry((keys, el, items) =>
  items.map((item) => {
    const props = {}
    let children
    for (let key in keys) {
      key === `children`
        ? children = item[keys[key]]
        : props[key] = item[keys[key]]
    }
    return el(props, children)
  })
)

const createElement = tagName => (...args) => {
  const [props, ...children] = args
  const isProps = isItProps(props)
  if (!args.length) {
    return React.createElement(tagName)
  }
  if (isProps && !children.length) {
    return (...childs) => React.createElement(
      tagName, ...callFns([props, ...childs])
    )
  }
  if (!isProps) {
    return React.createElement(
      tagName, null, ...callFns(args)
    )
  }
  return React.createElement(
    tagName, ...callFns(args)
  )
}

const lambda = (comp, ...args) => {
  const fn = (...props) => (
    props[0] && props[0].raw
      ? createElement(styled(comp)(...props))
      : createElement(comp)(...props)
  )
  return !args.length ? fn : fn(...args)
}

lambda.fragment = (...children) => (
  React.createElement(React.Fragment, {children})
)

lambda.curry = curry

lambda.compose = (...fns) => (...args) => (
  fns.slice().reverse().reduce(
    (acc, fn, idx) => !idx ? fn(...args) : fn(acc), null
  )
)

lambda.mapKey = (x, ...args) => {
  if (Array.isArray(x)) {
    const keys = {key: x[0], children: x[1]}
    return mapObject(keys, ...args)
  }
  if (typeof x === `function`) {
    return mapArray(x, ...args)
  }
  return mapObject(x, ...args)
}

const handler = {
  get: (obj, prop) => (
    prop in obj ? obj[prop] : lambda(prop)
  )
}

export default new Proxy(lambda, handler)
