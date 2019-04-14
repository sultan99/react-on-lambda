const React = require(`react`)
const styled = require(`./styled`)

const LAMBDA = Symbol(`λ`)

const {isArray} = Array
const {assign} = Object

const isLambda = value => value.type === LAMBDA

const isProps = props => (
  props !== null
  && typeof props === `object`
  && !props.children
  && !props.$$typeof
  && !isArray(props)
)

const toElement = elements => (
  elements.reduce((list, el) => {
    if (isArray(el)) {
      list.push(...toElement(el))
      return list
    }
    el && list.push(
      isLambda(el) ? el() : el
    )

    return list
  }, [])
)

function toChilds(args) {
  const [nextProps, ...rest] = args
  const childs = nextProps && nextProps.children
  if (childs) {
    const children = isArray(childs) ? childs : [childs]
    return toElement(children)
  }

  return isProps(nextProps)
    ? toElement(rest)
    : toElement(args)
}

function createNode(type) {
  let props = {}
  const next = (...args) => {
    const nextProps = args[0] || {}
    const propType = isProps(nextProps)

    if (propType || nextProps.children) {
      props = assign({}, props, nextProps)
      delete props.children
    }

    if (propType && args.length === 1) {
      return next
    }

    return React.createElement(
      type, props, ...toChilds(args)
    )
  }
  next.type = LAMBDA

  return next
}

function curry(fn) {
  const next = (...x) => fn.length <= x.length
    ? fn(...x)
    : (...y) => next(...x, ...y)
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
  createNode(React.Fragment)(...children)
)

lambda.curry = curry

lambda.compose = (...fns) => fns.reduce(
  (a, b) => (...args) => a(b(...args))
)

lambda.mapKey = curry((fn, items) => {
  const hasKey = isArray(items) && items.length && items[0].key

  if (hasKey && isLambda(fn)) {
    return items.map(item => fn(item))
  }

  if (!hasKey && isLambda(fn)) {
    return items.map((item, key) => fn({key})(item))
  }

  return items.map(fn)
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
