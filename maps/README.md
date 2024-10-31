# maps

This package contains utilities for maps.

# TTLMap class

## Functions

The TTLMap<key,value> has all the same functions as a regular Map with some
minor differences.

_NOTE_ - The TTLMap class implements the dispose symbol, which means you can use
`using` to dispose of the class when out of scope. However if that is not
possible, you can manually call `.dispose()`. Not correctly disposing can cause
memory leaks due to the inner interval checker. There is a `interval` of 1
millisecond running all the time.

The key differences include the following functions:

### set

Adds or updates a value in the map with the given key. The value will expire
after the specified time-to-live (ttl) period.

```ts
import { TTLMap } from "@rumpo/maps";
using map = new TTLMap<string, string>();

map.set("key1", "value1", 1000);
```

### getE

Retrieves the entry associated with the given key, including the expire time if
it exists and has not expired. If the entry has expired, it is removed from the
map.

```ts
import { TTLMap } from "@rumpo/maps";
using map = new TTLMap<string, string>();

map.set("key1", "value1", 1000);

const value = map.get("key1");

console.log(value); // {expiresAt: 1730340273818, value: "value1" }
```

### dispose

Releases all resources used by the TTLMap. This method is called automatically
when the TTLMap is garbage collected. It is also possible to call this method
directly to release resources.

```ts
import { TTLMap } from "@rumpo/maps";
const map = new TTLMap<string, string>();

map.set("key1", "value1", 1000);

map.dispose();
```

## Contributing

If you would like to contribute see our
[guide](https://github.com/rmalcomber/rumpo_std/blob/main/README.md)
