import { assert, assertEquals, assertThrows } from "@std/assert";

import { List } from "../main.ts";

export type TestType = { name: string; dateTime: Date; age: number };

function GetTestList(): TestType[] {
  return [
    { name: "John Smith", age: 35, dateTime: new Date() },
    { name: "Jane Smith", age: 35, dateTime: new Date() },
    { name: "Mark Stephens", age: 66, dateTime: new Date() },
    { name: "Willma Williams", age: 22, dateTime: new Date() },
  ];
}

Deno.test("List Creation", () => {
  const list = new List<number>([1, 2, 3]);
  assert(list);

  const list2 = new List([]);
  assert(list2);
});

Deno.test("Indexable Item", () => {
  const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assertEquals(list[0], 1);

  list[0] = 99;

  assertEquals(list[0], 99);

  // deno-lint-ignore no-explicit-any
  const val = list["somestring" as any];

  assertEquals(val, undefined);

  // deno-lint-ignore no-explicit-any
  list["somestring2" as any] = 100;

  // deno-lint-ignore no-explicit-any
  assertEquals(list["somestring2" as any], 100);
});

Deno.test("Iterator Test", () => {
  const list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  let i = 0;
  for (const item of list) {
    assertEquals(item, i + 1);
    i++;
  }
});

Deno.test("Test Count", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const count = testList.Count;

  assertEquals(count, testArray.length);
});

Deno.test("Test Item", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  for (let i = 0; i < testList.Count; i++) {
    assertEquals(testList.Item(i), testArray[i]);
  }

  assertThrows(() => {
    testList.Item(200);
  });
});

Deno.test("Test Add", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  testList.Add({ name: "Test", age: 100, dateTime: new Date() });

  assertEquals(testList.Count, testArray.length + 1);
  assertEquals(testList.Item(testList.Count - 1).name, "Test");
});

Deno.test("Test AddRange", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  testList.AddRange(testArray);

  assertEquals(testList.Count, testArray.length * 2);
});

Deno.test("Test Clear", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  testList.Clear();

  assertEquals(testList.Count, 0);
});

Deno.test("Test Contains", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const found = testList.Contains(testArray[1]);

  assert(found);

  const notFound = testList.Contains({
    name: "Test",
    age: 100,
    dateTime: new Date(),
  });
  assert(!notFound);
});

Deno.test("Test Find", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const found = testList.Find((t) => t.name === "Mark Stephens");

  assert(found);
  assertEquals(found.name, "Mark Stephens");

  const notFound = testList.Find((t) => t.name === "Test");
  assert(!notFound);
});

Deno.test("Test FindAll", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const found = testList.FindAll((t) => t.age > 30);

  assertEquals(found.Count, 3);
});

Deno.test("Test FindIndex", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const foundIndex = testList.FindIndex((t) => t.name === "Jane Smith");

  assertEquals(foundIndex, 1);
});

Deno.test("Test FindLast", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const foundLast = testList.FindLast((t) => t.name === "Jane Smith");

  assert(foundLast);
  assertEquals(foundLast.name, "Jane Smith");
});

Deno.test("Test FindLastIndex", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const foundLastIndex = testList.FindLastIndex((t) => t.name === "Jane Smith");

  assertEquals(foundLastIndex, 1);
});

Deno.test("Test ForEach", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const found = new List<TestType>();

  testList.ForEach((t) => found.Add(t));

  assertEquals(found.Count, testArray.length);
});

Deno.test("Test GetRange", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const found = testList.GetRange(1, 2);

  assertEquals(found.Count, 1);
  assertEquals(found[0].name, testArray[1].name);
});

Deno.test("Test IndexOf", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const foundIndex = testList.IndexOf(testArray[1]);

  assertEquals(foundIndex, 1);
});

Deno.test("Test Insert", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  testList.Insert(1, { name: "Test", age: 88, dateTime: new Date() });

  assertEquals(testList.Item(1).name, "Test");
});

Deno.test("Test LastIndexOf", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const lastIndex = testList.LastIndexOf(testArray[1]);

  assertEquals(lastIndex, 1);
});

Deno.test("Test Remove", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const removed = testList.Remove(testArray[2]);

  assertEquals(removed, true);
  assertEquals(testList.Count, testArray.length - 1);
  const notRemoved = testList.Remove({
    name: "Test",
    age: 100,
    dateTime: new Date(),
  });
  assertEquals(notRemoved, false);
});

Deno.test("Test RemoveAll", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const removed = testList.RemoveAll((t) => t.age > 30);
  assertEquals(removed, 3);
  assertEquals(testList.Count, testArray.length - 3);
});

Deno.test("Test RemoveAt", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  testList.RemoveAt(1);

  assertEquals(testList.Count, testArray.length - 1);
});

Deno.test("Test RemoveRange", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  testList.RemoveRange(1, 2);

  assertEquals(testList.Count, testArray.length - 2);
});

Deno.test("Test Reverse", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  testList.Reverse();

  assertEquals(testList.Item(0).name, testArray[testArray.length - 1].name);
});

Deno.test("Test Sort", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  testList.Sort((a, b) => a.age - b.age);

  assertEquals(
    testList.Item(0).age,
    testArray.reduce((min, current) => (current.age < min.age ? current : min))
      .age,
  );
});

Deno.test("Test ToArray", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const toArray = testList.ToArray();

  assertEquals(toArray.length, testArray.length);
  for (let i = 0; i < testArray.length; i++) {
    assertEquals(toArray[i].name, testArray[i].name);
  }
});

Deno.test("Test All", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const all = testList.All((t) => t.age > 10);

  assertEquals(all, true);
});

Deno.test("Test All2", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const all = testList.All((t) => t.age > 100);

  assertEquals(all, false);
});

Deno.test("Test Any", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const any = testList.Any((t) => t.age > 10);

  assertEquals(any, true);
});

Deno.test("Test Any2", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const any = testList.Any((t) => t.age > 100);

  assertEquals(any, false);
});

Deno.test("Test Any3", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const any = testList.Any();

  assertEquals(any, true);
});

Deno.test("Test Chunk", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);
  testList.Add({ name: "Test", age: 88, dateTime: new Date() });

  const chunk = testList.Chunk(2);

  assertEquals(chunk.Count, 3);
  assertEquals(chunk[0].Count, 2);
  assertEquals(chunk[1].Count, 2);
  assertEquals(chunk[2].Count, 1);

  const testList2 = new List<number>([1, 2]);
  const chunk2 = testList2.Chunk(5);
  assertEquals(chunk2.Count, 1);
  assertEquals(chunk2[0].Count, 2);
});

Deno.test("Test Concat", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const testList2 = new List<TestType>(testArray);

  const concatted = testList.Concat(testList2);

  assertEquals(concatted.Count, testArray.length * 2);
});

Deno.test("Test Distinct", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const distinct = testList.Distinct();

  assertEquals(distinct.Count, 4);
});

Deno.test("Test DistinctBy", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const distinct = testList.DistinctBy((a, b) => a.age === b.age);

  assertEquals(distinct.Count, 3);
});

Deno.test("Test First", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const first = testList.First();

  assertEquals(first.name, testArray[0].name);

  const newList = new List<TestType>([]);
  assertEquals(newList.First(), undefined);
});

Deno.test("Test Last", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const last = testList.Last();

  assertEquals(last.name, testArray[testArray.length - 1].name);
});

Deno.test("Test GroupBy", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const groups = testList.GroupBy((a, b) => a.age === b.age);

  assertEquals(groups.Count, 3);
});

Deno.test("Test OrderBy", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);

  const ordered = testList.OrderBy((a, b) => a.age - b.age);
  const testArrayOrdered = testArray.sort((a, b) => a.age - b.age);

  assertEquals(ordered[0].name, testArrayOrdered[0].name);
});

Deno.test("Test Join", () => {
  const testArray = GetTestList();
  const testList = new List<TestType>(testArray);
  const joined = testList.Join((a) => a.name, ", ");

  assertEquals(
    joined,
    "John Smith, Jane Smith, Mark Stephens, Willma Williams",
  );

  const newJoined = testList.Join((a) => a.name);
  assertEquals(
    newJoined,
    "John Smith,Jane Smith,Mark Stephens,Willma Williams",
  );
});
