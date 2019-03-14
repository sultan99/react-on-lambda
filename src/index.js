import React from 'react'
import tags from './tags'

export const extractChilds = (nodes = []) => {
  const children = nodes.map(node =>
    typeof node === `function`
      ? node() : node
  )
  return children.length > 1 ? children : children[0]
}

const createElement = tagName => (props, ...children) => {
  const isArray = Array.isArray(props)
  const isNode = props && props.$$typeof
  const isProps = props && !isNode && !isArray && typeof props === `object`

  if (isProps && !children.length) {
    return (...childs) => React.createElement(
      tagName, props, extractChilds(childs)
    )
  }
  if (isNode || typeof props === `string`) {
    return React.createElement(
      tagName, null, props
    )
  }
  if (typeof props === `function`) {
    return React.createElement(
      tagName, null, extractChilds([props, ...children])
    )
  }
  if (isArray) {
    return React.createElement(
      tagName, null, props
    )
  }

  return React.createElement(
    tagName, props, extractChilds(children)
  )
}

const lambda = () => {}

tags.forEach(tag =>
  lambda[tag] = createElement(tag)
)

export default lambda
