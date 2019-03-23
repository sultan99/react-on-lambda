# React on lambda
It is not yet another react-like library.
The library written on top of [React](https://github.com/facebook/react/) library, but with no jsx in usage.

You may love JSX because it has simple, declarative and html like syntax - nice extension to ECMAScript.
Unfortunately, despite these cool features you deal with text.
Most of time you find yourself doing js code inside html, and inside that html you make again another js code.
You can't just reuse your jsx strings without wrapping them by functions.

**So why not to use functions instead jsx strings?**

Get all benefits of functional programming:
 - split your code into more reusable parts
 - compose your functions
 - use currying functions
 - make test easier
 - write compact and clean code
<br/>
<br/>

## Features
- fun functional programming
- less & clean coding
- easy to learn
- minimal size (~1kb)
<br/>
<br/>

## How It Works
You can find a whole application example [here](https://github.com/sultan99/rol-usage).


```js
import λ from 'react-on-lambda'
import {render} from 'react-dom'

const postLink = λ.a({href: `/posts/123`})

const title = λ.compose(
  λ.h1({class: `post-title`}), // can be λ.h1({className: `post-title`})
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
<br/>

## API documentation
Later will be provided, at this moment some snippets.

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
const pages = [`Home page`, `Profile`, `About`]

λ.ul(
  λ.mapKey(λ.ul, pages)
)

// will equal to jsx ⤵
<ul>
  {pages.map((item, key) = >
    <li key={key}>
      {item}
    </li>
  )}
</ul>
```
<br/>

**Composition of pluck, mapKey**
```js
const data = [
  {id: 123, name: `foo`},
  {id: 123, name: `bar`},
]

const userList = λ.compose(
  λ.div,
  λ.ul,
  λ.mapKey(λ.li),
  λ.pluck(`name`, `id`)
)

userList(data) // will equal to jsx ⤵

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
<br/>


## Support
<a href="https://www.buymeacoffee.com/KGEzqayNQ" target="_blank">
  <img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg" alt="Buy Me A Coffee"/>
</a>
