# strings

This package contains utilities for strings

## Functions

Some of the functions include:

### ensureStringEndsWith

```ts
import { ensureStringEndsWith } from "@rumpo/strings";

const input = "Hello ";
const resp = ensureStringEndsWith(input, "world");

console.log(resp); // Hello world
```

### ensureStringStartsWith

```ts
import { ensureStringStartsWith } from "@rumpo/strings";

const input = " World";
const resp = ensureStringStartsWith(input, "Hello");

console.log(resp); // Hello world
```

### getFileExtension

```ts
import { getFileExtension } from "@rumpo/strings";

const input = "/path/myFile.mp4";
const resp = getFileExtension(input);

console.log(resp); // mp4
```

### getFileDotExtension

```ts
import { getFileDotExtension } from "@rumpo/strings";

const input = "/path/myFile.mp4";
const resp = getFileDotExtension(input);

console.log(resp); // .mp4
```

## Contributing

If you would like to contribute see our
[guide](https://github.com/rmalcomber/rumpo_std/blob/main/README.md)
