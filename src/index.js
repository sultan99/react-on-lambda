const React = require(`react`)
const styled = require(`./styled`)

const LAMBDA = Symbol(`λ`)

const {isArray} = Array

const clone = (...args) => Object.assign({}, ...args)

const isLambda = value => value.type === LAMBDA

const isProps = props => (
  props !== null
  && typeof props === `object`
  && !props.children
  && !props.$$typeof
  && !isArray(props)
)

const toChilds = items => items.reduce(
  (list, el) => {
    if (isArray(el)) {
      list.push(...toChilds(el))
      return list
    }
    el && list.push(
      isLambda(el) ? el() : el
    )

    return list
  }, []
)

function createNode(type) {
  function next(prevProps) {
    function fn(...args) {
      const [nextProps, ...children] = args
      const isNextProps = isProps(nextProps)

      if (isNextProps && args.length === 1) {
        const props = clone(prevProps, nextProps)
        const nextLambda = next(props)
        return nextLambda
      }

      if (isNextProps) {
        const props = clone(prevProps, nextProps)
        return React.createElement(
          type, props, ...toChilds(children)
        )
      }

      if (nextProps && nextProps.children) {
        return React.createElement(type, nextProps)
      }

      return React.createElement(
        type, prevProps, ...toChilds(args)
      )
    }
    fn.type = LAMBDA

    return fn
  }

  return next({})
}

function curry(fn) {
  const next = (...x) => fn.length <= x.length
    ? fn(...x)
    : (...y) => next(...x, ...y)
  next.type = LAMBDA

  return next
}

function lambda(comp, ...rest) {
  const isStyled = prop => prop && prop.raw
  const fn = (...props) => (
    isStyled(props[0])
      ? createNode(styled(comp)(...props))
      : createNode(comp)(...props)
  )
  fn.type = LAMBDA

  return rest.length ? fn(...rest) : fn
}

lambda.fragment = (...children) => (
  createNode(React.Fragment)(...children)
)

lambda.curry = curry

lambda.compose = (...fns) => {
  const composer = fns.reduce(
    (a, b) => (...args) => a(b(...args))
  )
  composer.type = LAMBDA

  return composer
}

lambda.mapKey = curry((fn, items) => {
  const hasKey = isArray(items) && items.length && items[0].key

  if (hasKey && isLambda(fn)) {
    return items.map(item => fn(item))
  }

  if (!hasKey && isLambda(fn)) {
    return items.map(
      (item, key) => fn({key})(item)
    )
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

lambda.nest = (...args) => (
  args.slice()
    .reverse()
    .reduce((result, fn) => fn(result))
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
