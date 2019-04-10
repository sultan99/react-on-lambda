const {Fragment, createElement} = require(`react`)
const styled = require(`./styled`)

const LAMBDA = Symbol(`λ`)

const isLambda = value => value && value.type === LAMBDA

const isArray = Array.isArray

const isItProps = props => (
  props !== null
  && typeof props === `object`
  && !props.$$typeof
  && !isArray(props)
)

const toNode = fn => isLambda(fn) ? fn() : fn

const toNodes = items => (
  items.map(item => isArray(item)
    ? item.map(toNode)
    : toNode(item)
  )
)

const curry = fn => {
  const next = (...x) => fn.length <= x.length
    ? fn(...x)
    : (...y) => next(...x, ...y)
  next.type = LAMBDA

  return next
}

// Object spreading not used to avoid babel polyfill
// yeah it is mutable function made for performance
const appendProps = (props, nextProps) => {
  const toChilds = prop => isArray(prop)
    ? toNodes(prop) : toNode(prop)

  Object.keys(nextProps).forEach(key => {
    const prop = nextProps[key]
    props[key] = key === `children`
      ? props[key] = toChilds(prop)
      : prop
  })
}

const createNode = tagName => {
  let props = {}
  const next = (...args) => {
    const [nextProps, ...children] = args
    const isProps = isItProps(nextProps)

    if (isProps) {
      appendProps(props, nextProps)
    }
    if (isProps && !props.children && !children.length) {
      return next
    }
    if (!isProps) {
      return createElement(
        tagName, props, ...toNodes(args)
      )
    }

    return createElement(
      tagName, props, ...toNodes(children)
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
    (acc, fn, index) => !index
      ? fn(...args) : fn(acc), null
  )
)

lambda.mapKey = curry((fn, items) => {
  const hasKey = isArray(items) && items.length && items[0].key
  const callback = !hasKey && isLambda(fn)
    ? (item, key) => fn({key})(item) : fn

  return items.map(callback)
})

lambda.mapProps = curry((maps, items) =>
  items.map(item => {
    const props = {}
    Object.keys(maps).forEach(key =>
      props[key] = item[maps[key]]
    )

    return props
  })
)

lambda.log = tag => value => {
  // eslint-disable-next-line
  tag ? console.log(tag, value) : console.log(value)
  return value
}

const handler = {
  get: (target, prop) => (
    prop in target ? target[prop] : lambda(prop)
  )
}

const rol = new Proxy(lambda, handler)

module.exports = rol

module.exports.default = rol
