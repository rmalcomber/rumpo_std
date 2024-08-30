# List\<T>

This package contains a List\<T> class that is similar to the .NET List\<T>
class.

## Functions

Some of the functions include:

### Functions

- Add: Adds an item to the end of the List<T>.
- AddRange: Adds all the items of an array to the end of the List<T>.
- Clear: Removes all items from the List<T>.
- Contains: Determines whether an element is in the List<T>.
- Find: Searches for an element that matches the conditions defined by the
  specified predicate, and returns the first occurrence within the entire
  List<T>.
- FindAll: Retrieves all the elements that match the conditions defined by the
  specified predicate.
- FindIndex: Searches for an element that matches the conditions defined by the
  specified predicate, and returns the zero-based index of the first occurrence
  within the entire List<T>.
- FindLast: Searches for an element that matches the conditions defined by the
  specified predicate, and returns the last occurrence within the entire
  List<T>.
- FindLastIndex: Searches for an element that matches the conditions defined by
  the specified predicate, and returns the zero-based index of the last
  occurrence within the entire List<T>.
- GetRange: Gets a range of elements from the List<T>.
- IndexOf: Searches for the specified object and returns the zero-based index of
  the first occurrence within the entire List<T>.
- Insert: Inserts an item to the List<T> at the specified index.
- InsertRange: Inserts the elements of a collection into the List<T> at the
  specified index.
- LastIndexOf: Searches for the specified object and returns the zero-based
  index of the last occurrence within the entire List<T>.
- Remove: Removes the first occurrence of a specific object from the List<T>.
- RemoveAll: Removes all the elements that match the conditions defined by the
  specified predicate.
- RemoveAt: Removes the element at the specified index of the List<T>.
- RemoveRange: Removes a range of elements from the List<T>.
- Reverse: Reverses the order of the elements in the List<T>.
- Sort: Sorts the elements in the entire List<T> using the specified
  Comparison<T>.
- ToArray: Copies the elements of the List<T> to an array.
- And more

## Examples

### Create a new List

```ts
import { List } from "@rumpo/list";

const myList = new List<string>();

myList.Add("Hello World");
```

Also an array can be passed into the constructor.

_A shallow clone is created of the array._

```ts
import { List } from "@rumpo/list";

const myList = new List<string>(["Hello", "World"]);

myList.Add("Hello World");

console.log(myList.Join((t) => t)); // Hello,World,Hello World
```

### Add

```ts
const testList = new List<TestType>();

testList.Add({ name: "Test", age: 100, dateTime: new Date() });

console.log(testList[0]); // { name: "Test", age: 100, dateTime: 2024-08-29T22:25:20.453Z }
```

### Clear

```ts
const testList = new List<TestType>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(testList.Count); // 10

testList.Clear();

console.log(testList.Count); // 0
```

### Find

```ts
const testList = new List<TestType>([
  { name: "John Smith", age: 35, dateTime: new Date() },
  { name: "Jane Smith", age: 35, dateTime: new Date() },
  { name: "Mark Stephens", age: 66, dateTime: new Date() },
  { name: "Willma Williams", age: 22, dateTime: new Date() },
]);

const found = testList.Find((t) => t.name === "Mark Stephens");

console.log(found); // { name: "Mark Stephens", age: 66, dateTime: 2024-08-29T22:34:52.838Z }
```

### Iterator

The List<T> class supports the iterator protocol, so you can use the for..of
loop to loop through the elements in the list.

```ts
const testList = new List<TestType>([
  { name: "John Smith", age: 35, dateTime: new Date() },
  { name: "Jane Smith", age: 35, dateTime: new Date() },
  { name: "Mark Stephens", age: 66, dateTime: new Date() },
  { name: "Willma Williams", age: 22, dateTime: new Date() },
]);

for (const item of testList) {
  console.log(item.name);
  // John Smith
  // Jane Smith
  // Mark Stephens
  // Willma Williams
}
```

### Index Accessing

The List<T> class supports index accessing, so you can use `list[index]` to get
the element at the specified index.

```ts
const testList = new List<TestType>([
  { name: "John Smith", age: 35, dateTime: new Date() },
  { name: "Jane Smith", age: 35, dateTime: new Date() },
  { name: "Mark Stephens", age: 66, dateTime: new Date() },
  { name: "Willma Williams", age: 22, dateTime: new Date() },
]);

console.log(testList[2].age); // 66
```

## Contributing

If you would like to contribute see our
[guide](https://github.com/rmalcomber/rumpo_std/blob/main/README.md)
