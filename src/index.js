import {Fragment, createElement} from 'react'
import styled from './styled'

const LAMBDA = Symbol(`λ`)

const isItProps = props => (
  props !== null
  && typeof props === `object`
  && !props.$$typeof
  && !Array.isArray(props)
)

const callFns = nodes => (
  nodes && nodes.map(node =>
    node && node.type === LAMBDA ? node() : node
  )
)

const curry = fn => {
  const next = (...x) => fn.length <= x.length
    ? fn(...x) : (...y) => next(...x, ...y)
  next.type = LAMBDA

  return next
}

const createNode = tagName => {
  let props = {}
  const next = (...args) => {
    const [nextProps, ...children] = args
    const isProps = isItProps(nextProps)

    if (isProps) {
      Object.keys(nextProps).forEach(key =>
        props[key] = nextProps[key]
      )
    }
    if (isProps && !props.children && !children.length) {
      return next
    }
    if (!isProps) {
      return createElement(
        tagName, props, ...callFns(args)
      )
    }

    return createElement(
      tagName, ...callFns([props, ...children])
    )
  }
  next.type = LAMBDA

  return next
}

const lambda = (comp, ...args) => {
  const isStyled = prop => prop && prop.raw
  const fn = (...props) => (
    isStyled(props[0])
      ? createNode(styled(comp)(...props))
      : createNode(comp)(...props)
  )
  fn.type = LAMBDA

  return !args.length ? fn : fn(...args)
}

lambda.fragment = (...children) => (
  createElement(Fragment, {children})
)

lambda.curry = curry

lambda.compose = (...fns) => (...args) => (
  fns.slice().reverse().reduce(
    (acc, fn, index) => !index ? fn(...args) : fn(acc), null
  )
)

lambda.mapKey = curry((fn, items) => {
  if (fn.type === LAMBDA) {
    const callback = items[0].key
      ? item => fn(item)
      : (item, key) => fn({key})(item)

    return items.map(callback)
  }

  const result = items.map(fn)
  const first = result[0]
  const isNode = first && first.$$typeof
  const hasKey = isNode && first.key

  return !isNode || hasKey ? result
    : result.map((el, index) =>
      ({...el, key: `${index}`})
    )
})

lambda.mapProps = curry((maps, items) =>
  items.map(item => {
    const props = {}
    Object.keys(maps).forEach(key =>
      typeof maps[key] === `function`
        ? props[key] = maps[key](item)
        : props[key] = item[maps[key]]
    )

    return props
  })
)

const handler = {
  get: ($this, prop) => (
    prop in $this ? $this[prop] : lambda(prop)
  )
}

export default new Proxy(lambda, handler)
