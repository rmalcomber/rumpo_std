# Strings Examples
This package contains string manipulation

### ensureStringEndsWith

```ts
    const input = "Hello ";
    const resp = ensureStringEndsWith(input, 'world');

    console.log(resp); // Hello world
```

### ensureStringStartsWith

```ts
    const input = " World";
    const resp = ensureStringStartsWith(input, 'Hello');

    console.log(resp); // Hello world
```

### getFileExtension

```ts
    const input = "/path/myFile.mp4";
    const resp = getFileExtension(input);

    console.log(resp); // mp4
```

### getFileDotExtension

```ts
    const input = "/path/myFile.mp4";
    const resp = getFileDotExtension(input);

    console.log(resp); // .mp4
```