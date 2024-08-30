/**
 * Splits the given array into chunks of the given size.
 * @param arr - The array to split.
 * @param size - The size of the chunks.
 * @returns A new array containing the chunks.
 */
export function chunk<T = unknown>(arr: T[], size: number): T[][] {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_: T, i: number) => arr.slice(i * size, i * size + size),
  );
}

/**
 * Removes all items from the given array that match the given predicate.
 * The removed items are returned.
 * @param arr - The array to remove items from.
 * @param predicate - The function to use to search for the items.
 * @returns The items that were removed from the array.
 */
export function popWhere<T = unknown>(
  arr: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
): T[] {
  const removedElements: T[] = [];
  const remainingElements: T[] = [];

  arr.forEach((item, index) => {
    if (predicate(item, index, arr)) {
      removedElements.push(item);
    } else {
      remainingElements.push(item);
    }
  });

  arr.length = 0;
  arr.push(...remainingElements);

  return removedElements;
}

/**
 * Removes all items from the given array that match the given predicate.
 * @param arr - The array to remove items from.
 * @param predicate - The function to use to search for the items.
 * @returns The items that were not removed from the array.
 */
export function removeWhere<T = unknown>(
  arr: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
): T[] {
  const remainingElements: T[] = [];

  arr.forEach((item, index) => {
    if (!predicate(item, index, arr)) {
      remainingElements.push(item);
    }
  });

  return remainingElements;
}
