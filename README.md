<!-- Original ASCII art for reference -->
<!-- ```
  #######                   #######
  ##|#|##                   ##|#|##
  ##|#|##       /_||_\      ##|#|##
  #_|#|_#     (| x..x |)    #_|#|_#
 _| | | | _    (_\__/_)   _ | | | |_ 
| | | | |' |   _|    |_  | `| | | | |
\          /  /      \ \  \         /
 \        /  / /|____|\ \  \       /
   \    /  / /  |    |  \ \ \    /
     \  \/ /    ||__||   \ \/  /
       \_/      ||  ||     \_/
                ()  ()
                ||  ||
               ooO  Ooo
               ________
       _______|longhand|_______
      [a CSS shorthand unf*cker]
      ==========================

``` -->

<p align="center">
<img src="https://github.com/user-attachments/assets/218fd939-430a-4cb8-973e-d282bfe0f7da" alt="longhand logo" width="400">
<br>
<sup><sub><em>ASCII art adapted from <a href="https://www.asciiart.eu/people/body-parts/hand-gestures">https://www.asciiart.eu/people/body-parts/hand-gestures</a></em>
</sub></sup>
</h1>

<p align="center"><img src="https://img.shields.io/npm/v/longhand"/></p>

`longhand` is a highly specialized CSS parser, focused on taking a shorthand style declaration -- such as `margin: 10px` -- and returning the implicit declarations that make up the shorthand (the _longhands_, if you will) -- such as `margin-top: 10px; margin-right: 10px; margin-bottom: 10px; margin-left: 10px`.

## Features

- Supports all CSS shorthand properties*
- Can parse shorthand properties into their longhand equivalents
- Can check if a property is a valid longhand property for a given shorthand property
- Supports both camelCase 🐪 and kebab-case 🍢
- TypeScript types included
- JSDoc-style API documentation
- No external dependencies
- Unit tested

\*on the browser. See [Limitations](#limitations) for more details regarding server-side limitations.

## Installation

#### pnpm
```bash
pnpm add longhand
```
#### npm
```bash
npm install longhand
```
#### yarn
```bash
yarn add longhand
```

## Usage

### Getting Started

The `longhand` package exports a single class, `Longhand`, which can be used to parse shorthand properties into their longhand equivalents. Both instance `parse` and static `parse` methods are available.

```ts
import { Longhand } from "longhand";

const { parse } = new Longhand();

{
  const parsed = parse("margin", "10px"); // Instance method
} /* or */ {
  const parsed = Longhand.parse("margin", "10px"); // Static method
} 

// `{...}` just to create a new block scope to keep the example valid
```

The `parse` method returns an instance of the `LonghandStyle` class, which contains the parsed longhand styles, without the original shorthand property. Those can, however, be accessed separately via `originalProperty` and `originalValue`.

```ts
import { Longhand } from "longhand";

const longhand = new Longhand();

const parsed = longhand.parse("margin", "10px");

console.log(parsed.originalProperty); // "margin"
console.log(parsed.originalValue); // "10px"
console.log(parsed.kebabCaseStyles); // { "margin-top": "10px", "margin-right": "10px", "margin-bottom": "10px", "margin-left": "10px" }
console.log(parsed.camelCaseStyles); // { "marginTop": "10px", "marginRight": "10px", "marginBottom": "10px", "marginLeft": "10px" }
console.log(parsed.styles); // { "margin-top": "10px", "margin-right": "10px", "margin-bottom": "10px", "margin-left": "10px", "marginTop": "10px", "marginRight": "10px", "marginBottom": "10px", "marginLeft": "10px" }
console.log(parsed.kebabCaseProperties); // [ "margin-top", "margin-right", "margin-bottom", "margin-left" ]
console.log(parsed.camelCaseProperties); // [ "marginTop", "marginRight", "marginBottom", "marginLeft" ]
console.log(parsed.properties); // [ "margin-top", "margin-right", "margin-bottom", "margin-left", "marginTop", "marginRight", "marginBottom", "marginLeft" ]
console.log(parsed.length); // 4
console.log(parsed.isValidLonghandProperty("margin-top")); // true
console.log(parsed.isValidLonghandProperty("margin-middle")); // false
```

### Examples

For examples, see [examples](/examples):
- [browser](/examples/browser)
- [server](/examples/server)

### Documentation

For the full API, see [DOCUMENTATION.md](/packages/longhand/DOCUMENTATION.md).

## Running Server Side

The way it's written, `longhand` leverages browser methods to parse shorthands. This is to avoid reinventing the wheel. Unfortunately, this means that to work in Node (or Bun, or Deno, or the next big runtime), _someone_ has to reinvent the wheel, or make it accessible on the server. Technically, only the [CSSOM](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) needs to be emulated, but that's accessed in the browser through a the `window` (`element.style`) so we'll need full DOM emulation through something like [`jsdom`](https://github.com/jsdom/jsdom) or [`happy-dom`](https://github.com/capricorn86/happy-dom), or a full-on headless browser like [`puppeteer`](https://github.com/puppeteer/puppeteer). If the former option is pursued, like in the [server](/examples/server/) example, then the following code should enable functionality:

```ts
import { JSDOM } from "jsdom";
import { Longhand } from "longhand";

const dom = new JSDOM("<!DOCTYPE html>");
// @ts-expect-error
global.window = dom.window;
global.document = dom.window.document;
```

Running `longhand` in a headless browser should not need any additional configuration.

## Limitations

Zero-dependency just means that no external packages are needed, but the runtime environment is effectively a dependency, and therefore, [YMMV](https://www.urbandictionary.com/define.php?term=ymmv).

There are two major limitations to look out for with this package:

1. `jsdom` is imperfect, and they have made some really questionable decisions particularly regarding the CSSOM -- which makes sense; _who in their right mind emulates CSS_ 🥲? -- so you might get strange results. I have done my best to support as much as possible (see [this](/packages/longhand/src/utils/getExpandedStyles.ts#L16)) but as you can see by the test input _[shorthand-properties.json](/packages/longhand/src/tests/shorthand-properties.json)_, styles marked as `unsupported.property` mean that `jsdom` doesn't support the property at all (mostly really just the `--webkit-*` exclusives), and those marked as `unsupported.value` mean that `jsdom` understands the property but doesn't know the `longhand`s exist. Perhaps, this will someday improve. But for now, I recommend not using this package server-side, unless you have a contrived use-case that you can test works. (FYI, `happy-dom` works even worse according to the tests.)

   1.1. Another silly limitation of `jsdom` is that, in `longhand`, `background: invalid` throws for `invalid` not being a valid `background` value, but `borderRadius: invalid` is accepted as valid.

2. As anyone who's worked on the web knows, browsers have a mind of their own, especially when it comes to CSS support. Therefore, the CSSOM _also_ differs slightly browser to browser. This is less of an issue, and is kind of expected, but you should keep in mind that not even the people behind whatever browser you're reading this in can agree on a universal model, so this package can't do that either.

## Why?

_Fair question._

The short(hand) answer is that I thought I needed it for work, so I thought I'd turn it into a full-on package. Turns out, I didn't need it for work.

The long(hand) answer -- and the arguably more useful one for a README -- is that CSS shorthands are super convoluted to work with in a structured manner, so if one were to ever write a CSS parser, they would have to figure out all the different ways in which the browser _unwraps_ a shorthand property into its individual components. [All pre-existing solutions](https://www.npmjs.com/search?q=shorthand%20parser) were incomplete, and they didn't need to be, so I wrote this.

## License

MIT License (whatever that means)

© 2024-Present

[Parsa Rahimi](https://parsuli.net)
