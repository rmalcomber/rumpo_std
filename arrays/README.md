# arrays

This package contains utilities for arrays.

## Functions

Some of the functions include:

### chunk

Splits the given array into chunks of the given size.

```ts
import { chunk } from "@rumpo/arrays";
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const numberChunks = chunk<number>(numbersArray, 2);

console.log(numberChunks); // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ] ]
```

### popWhere

Removes all items from the given array that match the given predicate.

```ts
import { popWhere } from "@rumpo/arrays";
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const removed = popWhere(testArray, (value) => value === 3);

console.log(removed); // [ 3 ];
```

### removeWhere

Removes all items from the given array that match the given predicate.

```ts
import { removeWhere } from "@rumpo/arrays";
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const remaining = removeWhere(testArray, (value) => value === 3);

console.log(remaining); //[1, 2, 4,  5, 6, 7, 8, 9, 10]
```

## Contributing

If you would like to contribute see our
[guide](https://github.com/rmalcomber/rumpo_std/blob/main/README.md)
