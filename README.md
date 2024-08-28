# Rumpo Standard Library

Here's a library of code I constantly find myself writing. This is my tool box.

## Currently

There are only string utilities until I pull out new functions from existing
projects.

I've tried to separate into different modules, as well as a complete module for
all

## Strings Examples

Typically string manipulations

### ensureStringEndsWith

```ts
import { ensureStringEndsWith } from "@rumpo/std";
const input = "Hello ";
const resp = ensureStringEndsWith(input, "world");

console.log(resp); // Hello world
```

### ensureStringStartsWith

```ts
import { ensureStringStartsWith } from "@rumpo/std";
const input = " World";
const resp = ensureStringStartsWith(input, "Hello");

console.log(resp); // Hello world
```

### getFileExtension

```ts
import { getFileExtension } from "@rumpo/std";
const input = "/path/myFile.mp4";
const resp = getFileExtension(input);

console.log(resp); // mp4
```

### getFileDotExtension

```ts
import { getFileDotExtension } from "@rumpo/std";
const input = "/path/myFile.mp4";
const resp = getFileDotExtension(input);

console.log(resp); // .mp4
```
