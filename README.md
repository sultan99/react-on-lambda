<div align="center">
  <img src="https://github.com/sultan99/react-on-lambda/raw/gh-pages/logo.svg?sanitize=true" width="110" height="110"/>
  <br/>
  <br/>
  <br/>
  
  <img src="https://raw.githubusercontent.com/sultan99/react-on-lambda/gh-pages/assets/comics.png"/>
</div>

<br/>
<br/>

# React on lambda
![GitHub package.json version](https://img.shields.io/github/package-json/v/sultan99/react-on-lambda.svg)
[![Coverage Status](https://coveralls.io/repos/github/sultan99/react-on-lambda/badge.svg)](https://coveralls.io/github/sultan99/react-on-lambda)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-on-lambda?label=gzip%20size&color=green)
![NPM Downloads](https://img.shields.io/npm/dm/react-on-lambda)
![GitHub License](https://img.shields.io/github/license/sultan99/react-on-lambda)

> A tiny library that simplifies the use of [React](https://github.com/facebook/react) without JSX.

<br/>

JSX has simple, declarative and html-like syntax, nice extension to ECMAScript.
Unfortunately, despite these cool features you deal with text.
Most of time you find yourself doing js code inside html, and inside that html you make again another js code and so on.
In order to reuse some jsx fragments you have to wrap them by functions. Then you may come to the main question:

#### Why not just use functions instead of jsx strings?

And get all benefits of functional programming:
 - splitting code into more reusable parts
 - curry and function composition
 - easier testing and debugging
 - compact and clean code
 
<br/>

## Features
- fun functional programming
- output bundle size less ~22% than JSX
- faster render and mount up to ~10% than JSX
- smooth integration to an existing React project with JSX
- no transpiler necessary, can be run directly in browser

<br/>

## Benchmarks
[The project](https://github.com/sultan99/rol-vs-jsx) includes two applications written using 
React on lambda and JSX for comparisons.

The follow results were gained:

**Render performance**
- React on lambda: `8.50ms`
- JSX: `9.97ms`

Most of time RoL showed faster results from **3%** up to **10%** than JSX version.
<br/>

**Bundle size**
- React on lambda: `2.03KB`
- JSX: `2.57KB`

RoL bundle size is less than JSX version 26%, but here we need to take an account the library size: `2.77KB`.

So the real advantage will be if the application size is larger than `11KB`.

<br/>

## Examples
React on lambda demo projects:

[Table component](https://github.com/sultan99/rol-table) is example of stateless components and function compositions.

A live demo at [codesandbox](https://codesandbox.io/s/jjlo9m5jq5).

Todos application:
 - [master branch](https://github.com/sultan99/rol-todos) - redux & ramda
 - [hooks branch](https://github.com/sultan99/rol-todos/tree/hooks) - no state management

<br/>

Read more info about symbol `λ` in the section: [editor configuration](#editor-configuration).

```js
import λ from 'react-on-lambda' // or import l from 'react-on-lambda'
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
The primary you will need to install `react-on-lambda` and `react`:

```sh
$ npm i react-on-lambda react -S
```

optionally you can install `styled-components` if you are going to use it:

```sh
$ npm i styled-components -S
```
<br/>

## API documentation

**Creating element and component**

```js
import λ, {div} from 'react-on-lambda'

div(`Hello world!`)
// jsx equivalent
<div>Hello world!</div>

λ.section({class: `sample`}, `Hello world!`)
// jsx equivalent
<section className="sample">Hello world!</section>

λ(Provider, {store}, app)
// jsx equivalent
<Provider store={store}><App/></Provider>
```

<br/>

**Currying function**

Endless currying until `children` or empty parameter is applied to the function.

```js
const onClick = () => {} // just for demo

const span = λ.span({className: `tag`})({color: green})({size: `large`}) // -> function
span()
// jsx equivalent
<span className="tag" color="green" size="large"/>

const btnPrimary = λ.button({primary: true}) // -> function
btnPrimary({onClick}, `Save`)
// jsx equivalent
<button primary onClick={onClick}>Save</button>
```

So with currying you can predefine some properties of components.

Or even you can override properties later.

```js
const span = λ.span({size: `large`}) // -> function
span({size: `small`}, `Sorry we changed our mind`)
// jsx equivalent
<span size="small">Sorry we changed our mind</span>
```

<br/>

**Styling**

`λ` wraps [styled-components](https://github.com/styled-components/styled-components) 
and returns a function. 
>Installation of styled-components is optional

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

**Function mapKey**
```js
const pages = [`Home page`, `Portfolio`, `About`]

λ.ul(
  λ.mapKey(λ.li, pages)
)

// jsx equivalent
<ul>
  {pages.map((item, key) =>
    <li key={key}>
      {item}
    </li>
  )}
</ul>
```
<br/>

**Composition**
```js
const data = [
  {id: 123, name: `Albert`, surname: `Einstein`},
  {id: 124, name: `Daimaou `, surname: `Kosaka`},
]

const userList = λ.compose(
  λ.div({class: `followers`}),
  λ.ul,
  λ.mapKey(λ.li),
  λ.mapProps({key: `id`, children: `name`})
)

userList(data)

// jsx equivalent
const UserList = props => (
  <div className="followers">
    <ul>
      {props.data.map(user =>
        <li key={user.id}>
          {user.name}
        </li>
      )}
    </ul>
  </div>
)

<UserList data={data}/>
```
<br/>

**Nesting**
```js
const postPage = λ.nest(
  λ.main({class: `app`}),
  λ.section,
  λ.article(`
    Lorem ipsum dolor sit amet,
    Ernestina Urbanski consectetur adipiscing elit.
    Ut blandit viverra diam luctus luctus...
  `),
)

// jsx equivalent
const PostPage = () => (
  <main className="app">
    <section>
      <article>
        Lorem ipsum dolor sit amet,
        Ernestina Urbanski consectetur adipiscing elit.
        Ut blandit viverra diam luctus luctus...
      </article>
    </section>
  </main>
)
```
<br/>

**Debug**

```js
const userList = λ.compose(
  λ.div,
  λ.ul,
  λ.log(`after mapping`), // -> will log piping value
  λ.mapKey(λ.li)
)
```

<br/>

## Editor configuration
> Code highlighting in Atom

<img src="https://raw.githubusercontent.com/sultan99/react-on-lambda/gh-pages/assets/snippet-atom.png" style="border-radius: 4px;"/>
<br/>

Personally I hate to use symbols `$` `_` it makes code look dirty and reminds me [Perl](https://regmedia.co.uk/2017/10/31/perl_code_example.png) or regular expression.
I prefer to use Greek letter `λ` – short and meaningful.

Of course you can use any identifier at your own choice:
```js
import l from 'react-on-lambda'
// or 
import {div, h1} from 'react-on-lambda'

```

If you like to try using `λ` you can setup hot key and CSS syntax highlighting following the instructions bellow:
- [Github Atom](./docs/atom.md)
- Microsoft VS Code (will be provided)

<br/>
<br/>

## Feedback 
Any questions or suggestions?

You are welcome to discuss it on:

[![Gitter](https://badges.gitter.im/react-on-lambda/community.svg)](https://gitter.im/react-on-lambda/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/sultan_arziev)

<br/>
<br/>

<a href="https://www.buymeacoffee.com/KGEzqayNQ" target="_blank">
  <img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg" alt="Buy Me A Coffee"/>
</a>
