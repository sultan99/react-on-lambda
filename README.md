# React on lambda

It is not yet another react-like library.
The library written on top of [React](https://github.com/facebook/react/) library, but with no jsx in usage.

You may love JSX because it has simple, declarative and html like syntax - nice extension to ECMAScript.
Unfortunately, despite these cool features you deal with text.
Most of time you find yourself doing js code inside html, and inside that html you make again another js code.
You can't just reuse your jsx strings without wrapping it by functions.

**So why not to use functions instead jsx strings?**

Get all benefits of functional programming:
 - split your code into more reusable parts
 - compose your functions
 - use currying functions
 - make test easier
 - write compact and clean code


## Features
- fun functional programming
- less & clean coding
- easy to learn
- minimal size (~1kb)



## How It Works

You can find a whole application example [here](https://github.com/sultan99/rol-usage).


```js
import λ from 'react-on-lambda'
import {render} from 'react-dom'

const postLink = λ.a({href: `/posts/123`})

const title = λ.compose(
  λ.h1({className: `post-title`}),
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

## Getting started

The next version `styled-components` will be optional.

```sh
$ npm i react-on-lambda react styled-components -S
```

or install with yarn:

```sh
$ yarn add react-on-lambda react styled-components
```

## API documentation
Later will be provided.

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

## Who Uses React on Lambda

No body yet...😅

**Be first!**


## Credits
Built with [react](https://github.com/facebook/react/), [styled-components](https://www.styled-components.com/) and ❤︎ by [Sultan Arziyev](https://github.com/sultan99).


## Support
<a href="https://www.buymeacoffee.com/KGEzqayNQ" target="_blank">
  <img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg" alt="Buy Me A Coffee"/>
</a>
