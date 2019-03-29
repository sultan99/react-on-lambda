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

const addKey = el => (item, index) => {
  const [value, key] = Array.isArray(item)
    ? item : [item, index]
  return el({key}, value)
}

const lambda = comp => (...args) => (
  args[0] && args[0].raw
    ? createElement(styled(comp)(...args))
    : createElement(comp)(...args)
)

lambda.fragment = (...children) => (
  React.createElement(React.Fragment, {children})
)

lambda.compose = (...fns) => arg => (
  fns.slice().reverse().reduce(
    (acc, fn) => fn(acc), arg
  )
)

lambda.mapKey = (el, items) => (
  items
    ? items.map(addKey(el))
    : list => list.map(addKey(el))
)

lambda.pluck = (value, key, list) => {
  const fn = items => key
    ? items.map(item => [item[value], item[key]])
    : items.map((item, index) => [item[value], index])
  return list ? fn(list) : fn
}

lambda.showIf = (isOK, one, two) => (
  isOK && one || two || null
)

const handler = {
  get: (obj, prop) => (
    prop in obj ? obj[prop] : lambda(prop)
  )
}

export default new Proxy(lambda, handler)
