import {
  assert,
  assertEquals,
} from '@std/assert';

import {
  chunk,
  popWhere,
  removeWhere,
} from '../main.ts';

Deno.test("Test Chunking", () => {
  // Test Numbers
  const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const numberChunks = chunk<number>(numbersArray, 2);

  for (const chunk of numberChunks) {
    assertEquals(chunk.length, 2);
  }

  // Test Strings
  const stringArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const stringChunks = chunk<string>(stringArray, 2);

  for (const chunk of stringChunks) {
    assertEquals(chunk.length, 2);
  }

  // Test Objects
  const objArray = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ];
  const objChunks = chunk<{ value: number }>(objArray, 2);

  for (const chunk of objChunks) {
    assertEquals(chunk.length, 2);
  }

  // Test Arrays

  const arrayArray = [
    [{ value: 1 }],
    [{ value: 2 }],
    [{ value: 3 }],
    [{ value: 4 }],
    [{ value: 5 }],
    [{ value: 6 }],
    [{ value: 7 }],
    [{ value: 8 }],
    [{ value: 9 }],
    [{ value: 10 }],
  ];
  const arrayChunks = chunk<{ value: number }[]>(arrayArray, 2);

  for (const chunk of arrayChunks) {
    assertEquals(chunk.length, 2);
  }

  // Test Left overs
  const oddArray = [1, 2, 3, 4, 5, 6, 7];

  const oddChunks = chunk(oddArray, 2);

  assertEquals(oddChunks.length, 4);
});

Deno.test("Test popWhere", () => {
  
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const removed = popWhere(testArray, (value) => value === 3);
  assert(removed !== null);

  assertEquals(removed[0], 3);
  assertEquals(testArray.length, 9);
  
  const objectTestArray = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
    { value: 10 },
    { value: 10 },
    { value: 10 },
  ];

  assertEquals(objectTestArray.length, 13);

  const objectRemoved = popWhere(objectTestArray, (obj) => obj.value === 3);
  assert(objectRemoved);
  assertEquals(objectRemoved[0].value, 3);
  assertEquals(objectTestArray.length, 12);

  const objectsRemoved = popWhere(objectTestArray, (obj) => obj.value === 10);

  assert(objectsRemoved);

  assertEquals(objectsRemoved.length, 4);
  assertEquals(objectTestArray.length, 8);
});

Deno.test("Test removeWhere", () => {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const remaining = removeWhere(testArray, (value) => value === 3);

  console.log(remaining);
  assert(remaining !== null);

  assertEquals(remaining[2], 4);
  assertEquals(remaining.length, 9);

  const objectTestArray = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
    { value: 10 },
    { value: 10 },
    { value: 10 },
  ];

  assertEquals(objectTestArray.length, 13);

  const objectsRemaining = removeWhere(
    objectTestArray,
    (obj) => obj.value === 3,
  );
  assert(objectsRemaining);
  assertEquals(objectsRemaining[2].value, 4);
  assertEquals(objectsRemaining.length, 12);
});
