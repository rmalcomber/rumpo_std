# Strings Examples

This package contains string manipulation

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
