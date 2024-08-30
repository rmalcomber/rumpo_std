# Rumpo Standard Library

Here's a library of code I constantly find myself writing. This is my tool box.
It's not the most extensive toolbox just yet. I'm currently still going through
other projects to see what I can lift from there.

Some things have been written from me, some "lifted" from Stackoverflow, some
even AI generated. I don't have the memory to attribute everyone resposible. So
if your code is in here from 14 years ago (JS not TS), then thank you!

Please feel free to contribute, submit enhancements and report issues/request
features. Some things I'm trying to do with this project

- No dependencies on other libraries, except deno std.
- Keep code suitable scoped
- Avoid niche functions
- Utility functions, or supporting classes with functions. No frameworks....for
  now.
- Must work with:
  - Cloudflare Workers
  - Node.js
  - Deno*
  - Bun
  - Browsers
- Keep all package versions in sync

\* _Deno is first priority_

If you find you have a utility, that you constantly copy from one project to
another and you're getting sick of it. And you can't be arsed to publish a file
with 4 lines of code. Get it on here.

## Currently

There are three packages/modules, Strings, Arrays, and List.

I've separated the module and made them as one complete module.

They're all published on [jrs](https://jsr.io/@rumpo)

- [@rumpo/std](https://jsr.io/@rumpo/std) - Complete Package
- [@rumpo/strings](https://jsr.io/@rumpo/strings) - Partial Package
- [@rumpo/arrays](https://jsr.io/@rumpo/arrays) - Partial Package
- [@rumpo/list](https://jsr.io/@rumpo/list) - Partial Package

## Example

All packages can be accessed through deno with

```ts
import {} from "@rumpo/std";
```

## Strings

Typically string manipulations. Not the biggest collection yet

More Information
[Here](https://github.com/rmalcomber/rumpo_std/blob/main/strings/README.md)

The Strings package can be imported via

```ts
import {} from "@rumpo/strings";
```

### Example

```ts
import { ensureStringEndsWith } from "@rumpo/strings";
const input = "Hello ";
const resp = ensureStringEndsWith(input, "world");

console.log(resp); // Hello world
```

## Arrays

Package with array utilities, not the biggest collection yet as spent more time
on the List package.

More Information
[Here](https://github.com/rmalcomber/rumpo_std/blob/main/arrays/README.md)

The Arrays package can be imported via

```ts
import {} from "@rumpo/arrays";
```

### Example

```ts
import { chunk } from "@rumpo/arrays";
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const numberChunks = chunk<number>(numbersArray, 2);

console.log(numberChunks); // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ] ]
```

## List

This package contains a List\<T> class that is similar to the .NET List\<T>
class.

More Information
[Here](https://github.com/rmalcomber/rumpo_std/blob/main/list/README.md)

The Strings package can be imported via

```ts
import {} from "@rumpo/list";
```

### Example

```ts
import { List } from "@rumpo/list";

const myList = new List<string>();

myList.Add("Hello World");
```

## Contributing

If you would like to contribute see our
[guide](https://github.com/rmalcomber/rumpo_std/blob/main/README.md)
