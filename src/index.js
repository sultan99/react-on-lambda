import React from 'react'

export const fnToNode = args => (
  args && args.map(arg =>
    typeof arg === `function` ? arg() : arg
  )
)

const createElement = tagName => (...args) => {
  if (!args.length) {
    return React.createElement(tagName)
  }
  const [props, ...children] = args
  const isObject = props !== null && typeof props === `object`
  const isArray = Array.isArray(props)
  const isNode = isObject && props.$$typeof
  const isProps = isObject && !isNode && !isArray

  if (isProps && !children.length) {
    return (...childs) => React.createElement(
      tagName, ...fnToNode([props, ...childs])
    )
  }

  const isFunction = typeof props === `function`
  const isString = typeof props === `string`
  if (isNode || isFunction || isString) {
    return React.createElement(
      tagName, null, ...fnToNode(args)
    )
  }
  if (isArray) {
    return React.createElement(
      tagName, null, fnToNode(props)
    )
  }

  return React.createElement(
    tagName, ...fnToNode(args)
  )
}

const lambda = comp => createElement(comp)

lambda.fragment = (...nodes) => (
  React.createElement(React.Fragment, null, nodes)
)

lambda.compose = (...fns) => arg => (
  fns.reverse().reduce(
    (acc, fn) => fn(acc), arg
  )
)

const handler = {
  get(obj, prop) {
    return prop in obj
      ? obj[prop]
      : createElement(prop)
  }
}

export default new Proxy(lambda, handler)
