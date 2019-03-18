import React from 'react'
import tags from './tags'

export const parseParams = args => (
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
  const isNode = isObject && props.$$typeof
  const isFunction = typeof props === `function`
  const isString = typeof props === `string`
  if (isNode || isFunction || isString) {
    return React.createElement(
      tagName, null, ...parseParams(args)
    )
  }

  const isArray = Array.isArray(props)
  const isProps = isObject && !isNode && !isArray
  if (isProps && !children.length) {
    return (...childs) => React.createElement(
      tagName, ...parseParams([props, ...childs])
    )
  }
  if (isArray) {
    return React.createElement(
      tagName, null, parseParams(props)
    )
  }

  return React.createElement(
    tagName, ...parseParams(args)
  )
}

const lambda = comp => createElement(comp)

tags.forEach(tag =>
  lambda[tag] = createElement(tag)
)

export default lambda
