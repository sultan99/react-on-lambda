import React from 'react'
import styled from 'styled-components'

const callFns = args => (
  args && args.map(arg =>
    typeof arg === `function` ? arg() : arg
  )
)

const createElement = tagName => (...args) => {
  const [props, ...children] = args
  const isObject = props !== null && typeof props === `object`
  const isArray = Array.isArray(props)
  const isNode = isObject && props.$$typeof
  const isProps = isObject && !isNode && !isArray

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

const styledOrComponent = comp => (...args) => {
  return args[0] && args[0].raw
    ? createElement(styled(comp)(...args))
    : createElement(comp)(...args)
}

const lambda = styledOrComponent

lambda.fragment = (...nodes) => (
  React.createElement(React.Fragment, null, nodes)
)

lambda.compose = (...fns) => arg => (
  fns.reverse().reduce(
    (acc, fn) => fn(acc), arg
  )
)

const addKey = el => (item, index) => {
  const [value, key] = Array.isArray(item)
    ? item
    : [item, index]
  return el({key}, value)
}

lambda.mapKey = (el, items) => {
  return items
    ? items.map(addKey(el))
    : list => list.map(addKey(el))
}

lambda.pluck = (value, key, list) => {
  const fn = items => key
    ? items.map(item => [item[value], item[key]])
    : items.map((item, index) => [item[value], index])
  return list ? fn(list) : fn
}

const handler = {
  get(obj, prop) {
    return prop in obj
      ? obj[prop]
      : styledOrComponent(prop)
  }
}

export default new Proxy(lambda, handler)
