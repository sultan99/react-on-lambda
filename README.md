# React on lambda
A tiny JavaScript library which allows to use React without JSX and without pain.

JSX has simple, declarative and html-like syntax, nice extension to ECMAScript.
Unfortunately, despite these cool features you deal with text.
Most of time you find yourself doing js code inside html, and inside that html you make again another js code and so on.
In order to reuse some jsx fragments of code you have to wrap them by functions. So then you come to the main question:

**Why not just use functions instead of jsx strings?**

And get all benefits of functional programming:
 - splitting code into more reusable parts
 - curry an function composition
 - easier testing & debugging
 - compact and clean code
<br/>

## Features
- fun functional programming
- less & clean coding
- no need of [Babel](https://babeljs.io/)
- minimal size (~1kb)
<br/>

## How It Works
You can find a whole application example [here](https://github.com/sultan99/rol-usage).

```js
import λ from 'react-on-lambda'
import {render} from 'react-dom'

const postLink = λ.a({href: `/posts/123`})

const title = λ.compose(
  λ.h1({class: `post-title`}), // or λ.h1({className: `post-title`})
  postLink
)

const post = λ.div(
  title(`How to use react on lambda?`),
  λ.p(`
    Lorem ipsum dolor sit amet,
    Ernestina Urbanski consectetur adipiscing elit.
    Ut blandit viverra diam luctus luctus...
  `),
  postLink(`Read more`)
)

render(
  post,
  document.getElementById(`app`)
)
```
<br/>

## Getting started
The next version `styled-components` will be optional.

```sh
$ npm i react-on-lambda react styled-components -S
```

or install with yarn:

```sh
$ yarn add react-on-lambda react styled-components
```
<br/>

## API documentation
Full documentation will be provided later, at this moment some snippets.

**Styling**

```js
import λ from 'react-on-lambda'

const header = λ.h1`
  color: #ff813f;
  font-size: 22px;
`

const onClick = () => alert(`Hi!`)

const app = λ.div(
  header(`Welcome to React on λamda!`),
  λ.button({onClick}, `OK`)
)

export default app
```
<br/>

**Helper function mapKey**

```js
const pages = [`Home page`, `Portfolio`, `About`]

λ.ul(
  λ.mapKey(λ.ul, pages)
)

// jsx equivalent
<ul>
  {pages.map((item, key) = >
    <li key={key}>
      {item}
    </li>
  )}
</ul>
```
<br/>

**Composition of pluck and mapKey**

```js
const data = [
  {id: 123, name: `foo`},
  {id: 124, name: `bar`},
]

const userList = λ.compose(
  λ.div,
  λ.ul,
  λ.mapKey(λ.li),
  λ.pluck(`name`, `id`)
)

userList(data)

// jsx equivalent
<div>
  <ul>
    {data.map(user = >
      <li key={user.id}>
        {user.name}
      </li>
    )}
  </ul>
</div>
```
<br/>

**showIf**

```js
const app = props => λ.div(
  λ.showIf(!props.isLoading,
    λ.h1(`Welcome to React on λambda!`),
    λ.span(`Please wait, page is loading...`)
  )
)
```
<br/>
<br/>

## Support
<a href="https://www.buymeacoffee.com/KGEzqayNQ" target="_blank">
  <img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg" alt="Buy Me A Coffee"/>
</a>
