const styled = require(`./styled`)
const {Fragment, createElement} = require(`react`)

const LAMBDA = Symbol(`λ`)
const {assign} = Object
const {isArray} = Array

const isLamda = value => value.type === LAMBDA

const isEmpty = value => !value || value === true

const isProps = props => (
  props !== null
  && typeof props === `object`
  && !props.children
  && !props.$$typeof
  && !isArray(props)
)

const isChild = value => (
  typeof value === `number` ||
  typeof value === `string` ||
  typeof value === `object` && value.$$typeof
)

const addProps = (props, args) => (
  args.reduce(toProps, props)
)

function addChild(props = {}, child) {
  if (isArray(props.children)) {
    return assign(
      {}, props, {children: [...props.children, child]}
    )
  }

  return props.children
    ? assign({}, props, {children: [props.children, child]})
    : assign({}, props, {children: child})
}

function toProps(props, next) {
  if (isEmpty(next)) return props
  if (isChild(next)) return addChild(props, next)
  if (isLamda(next)) return addChild(props, next())
  if (isArray(next)) return addProps(props, next)
  if (isArray(next.children)) return addProps(props, next.children)

  return assign({}, props, next)
}

function curry(fn) {
  const next = (...x) => fn.length <= x.length
    ? fn(...x)
    : (...y) => next(...x, ...y)
  next.type = LAMBDA

  return next
}

function createNode(type, props) {
  const next = (...args) => (
    isProps(args[0]) && args.length === 1
      ? createNode(type, addProps(props, args))
      : createElement(type, addProps(props, args))
  )
  next.type = LAMBDA

  return next
}

function lambda(comp, ...args) {
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
  createElement(Fragment, addProps({}, children))
)

lambda.curry = curry

lambda.compose = (...fns) => fns.reduce(
  (a, b) => (...args) => a(b(...args))
)

lambda.mapKey = curry((fn, items) => {
  const hasKey = isArray(items) && items.length && items[0].key
  const callback = !hasKey && isLamda(fn)
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
