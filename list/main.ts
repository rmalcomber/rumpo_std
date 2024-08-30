import { chunk } from '@rumpo/arrays/';

/**
 * Represents a list of items.
 * @template T - The type of items in the list.
 */
export class List<T> {
  private _arr: T[] = [];

  [index: number]: T;

  /**
   * Creates a new list from the given data.
   * @param data - The data to use to create the list. If not provided, the list will be empty.
   * @returns A proxy object that wraps the list. The proxy allows you to access the list items as if they were properties of the object with the same name as the index of the item.
   */
  constructor(data?: T[]) {
    if (data) {
      this._arr = data.slice();
    }

    return new Proxy<List<T>>(this, {
      get: (target, prop): T | undefined => {
        if (typeof prop === "string" && !isNaN(Number(prop))) {
          const index = Number(prop);
          return target.Item(index);
        }
        // deno-lint-ignore no-explicit-any
        return (target as any)[prop];
      },
      set: (target, prop, value) => {
        if (typeof prop === "string" && !isNaN(Number(prop))) {
          const index = Number(prop);
          target.Insert(index, value);
        }
        // deno-lint-ignore no-explicit-any
        (target as any)[prop] = value;
        return true;
      },
    });
  }

  /**
   * Gets the number of items in the list.
   * @returns The number of items in the list.
   */
  public get Count(): number {
    return this._arr.length;
  }

  /**
   * Gets the item at a specific index.
   * @param index - The index of the item to retrieve.
   * @returns The item at the specified index.
   * @throws {Error} If the index is out of bounds.
   */
  public Item(index: number): T {
    if (index > this._arr.length) {
      throw new Error("Index out of bounds");
    }

    return this._arr[index];
  }

  /**
   * Adds an item to the end of the list.
   * @param item - The item to add.
   */
  public Add(item: T): void {
    this._arr.push(item);
  }

  /**
   * Adds multiple items to the end of the list.
   * @param items - The items to add.
   */
  public AddRange(items: T[]): void {
    this._arr.push(...items);
  }

  /**
   * Removes all items from the list.
   */
  public Clear(): void {
    this._arr.length = 0;
  }

  /**
   * Determines whether an item is in the list.
   * @param item - The item to search for.
   * @returns `true` if the item is found in the list; otherwise, `false`.
   */
  public Contains(item: T): boolean {
    return this._arr.includes(item);
  }

  /**
   * Finds the first item in the list that matches the given predicate.
   * @param predicate - The function to use to search for the item.
   * @returns The first item in the list that matches the given predicate, or `undefined` if not found.
   */
  public Find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
  ): T | undefined {
    return this._arr.find(predicate);
  }

  /**
   * Finds all items in the list that match the given predicate.
   * @param predicate - The function to use to search for the items.
   * @returns A new list containing all items in the list that match the given predicate.
   */
  public FindAll(
    predicate: (value: T, index: number, obj: T[]) => unknown,
  ): List<T> {
    return new List(this._arr.filter(predicate));
  }

  /**
   * Finds the index of the first item in the list that matches the given predicate.
   * @param predicate - The function to use to search for the item.
   * @returns The index of the first item in the list that matches the given predicate, or `-1` if not found.
   */
  public FindIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
  ): number {
    return this._arr.findIndex(predicate);
  }

  /**
   * Finds the last item in the list that matches the given predicate.
   * @param predicate - The function to use to search for the item.
   * @returns The last item in the list that matches the given predicate, or `undefined` if not found.
   */
  public FindLast(
    predicate: (value: T, index: number, obj: T[]) => unknown,
  ): T | undefined {
    return this._arr.findLast(predicate);
  }

  /**
   * Finds the index of the last item in the list that matches the given predicate.
   * @param predicate - The function to use to search for the item.
   * @returns The index of the last item in the list that matches the given predicate, or `-1` if not found.
   */
  public FindLastIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
  ): number {
    return this._arr.findLastIndex(predicate);
  }

  /**
   * Calls a provided function once for each element in the list.
   * @param callbackfn - The function to use to iterate over the list.
   * @returns void
   */
  public ForEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
  ): void {
    this._arr.forEach(callbackfn);
  }

  /**
   * Returns a new list containing a subset of the elements of this list, from a start index to an end index.
   * @param startIndex - The index of the first item to include in the new list.
   * @param endIndex - The index after the last item to include in the new list.
   * @returns A new list containing the subset of elements from this list.
   */
  public GetRange(startIndex: number, endIndex: number): List<T> {
    const cloned = this._arr.slice(startIndex, endIndex);
    return new List<T>(cloned);
  }

  /**
   * Determines the index of a specific item in the list.
   * @param item - The item to locate in the list.
   * @returns The index of the item if found in the list; otherwise, `-1`.
   */
  public IndexOf(item: T): number {
    return this._arr.indexOf(item);
  }

  /**
   * Inserts an item into the list at a specified index.
   * @param index - The index at which to insert the item.
   * @param item - The item to insert.
   */
  public Insert(index: number, item: T): void {
    this._arr.splice(index, 0, item);
  }

  /**
   * Determines the index of the last occurrence of a specific item in the list.
   * @param item - The item to locate in the list.
   * @returns The index of the last occurrence of the item in the list; otherwise, `-1`.
   */
  public LastIndexOf(item: T): number {
    return this._arr.lastIndexOf(item);
  }

  /**
   * Removes the first occurrence of a specific item from the list.
   * @param item - The item to remove from the list.
   * @returns `true` if the item is found and removed from the list; otherwise, `false`.
   */
  public Remove(item: T): boolean {
    const index = this.IndexOf(item);
    if (index > -1) {
      this._arr.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Removes all items from the list that match the given predicate.
   * @param predicate - The function to use to search for the items.
   * @returns The number of items removed from the list.
   */
  public RemoveAll(
    predicate: (value: T, index: number, obj: T[]) => unknown,
  ): number {
    const originalLength = this._arr.length;
    this._arr = this._arr.filter(
      (item, index, self) => !predicate(item, index, self),
    );
    return originalLength - this._arr.length;
  }

  /**
   * Removes the item at a specific index from the list.
   * @param index - The index of the item to remove from the list.
   */
  public RemoveAt(index: number): void {
    this._arr.splice(index, 1);
  }

  /**
   * Removes a range of items from the list.
   * @param index - The index of the first item to remove.
   * @param count - The number of items to remove.
   */
  public RemoveRange(index: number, count: number): void {
    this._arr.splice(index, count);
  }

  /**
   * Reverses the order of the elements in the list.
   * @returns A new list with the elements in reverse order.
   */
  public Reverse(): List<T> {
    return new List<T>(this._arr.reverse());
  }

  /**
   * Sorts the elements of the list in place and returns the sorted list.
   * The default sort order is ascending according to the string Unicode code points.
   * @param compareFn - Optional. A function that defines the sort order. If omitted, the array elements are sorted in ascending order, according to each element's Unicode code point value.
   * @returns A new list containing the elements in the sorted order.
   */
  public Sort(compareFn?: (a: T, b: T) => number): List<T> {
    return new List<T>(this._arr.sort(compareFn));
  }

  /**
   * Returns a shallow copy of the array.
   * @returns A new array containing a shallow copy of the elements of this list.
   */
  public ToArray(): T[] {
    return this._arr.slice();
  }

  /**
   * Determines whether all elements of the list satisfy the predicate.
   * @param predicate - The function to use to search for the items.
   * @returns `true` if all elements of the list satisfy the predicate; otherwise, `false`.
   */
  public All(
    predicate: (value: T, index: number, obj: T[]) => unknown,
  ): boolean {
    return this._arr.every(predicate);
  }

  /**
   * Determines whether any element of the list satisfies the predicate.
   * @param predicate - Optional. A function that defines the search criteria. If omitted, the array elements are searched against the existence of elements in the array.
   * @returns `true` if any element of the list satisfies the predicate; otherwise, `false`.
   */
  public Any(
    predicate?: (value: T, index: number, obj: T[]) => unknown,
  ): boolean {
    if (!predicate) {
      return this._arr.length > 0;
    }

    return this.FindIndex(predicate) > -1;
  }

  /**
   * Splits the list into sublists of the given size.
   * @param size - The size of the sublists.
   * @returns A new list containing the sublists of the given size.
   */
  public Chunk(size: number): List<List<T>> {
    const chunks = chunk(this._arr, size);
    const returnChunks: List<T>[] = [];

    for (const chunk of chunks) {
      returnChunks.push(new List<T>(chunk));
    }

    return new List<List<T>>(returnChunks);
  }

  /**
   * Concatenates the given list to the end of this list.
   * @param arr - The list to concatenate.
   * @returns A new list containing all items from this list and the given list.
   */
  public Concat(arr: List<T>): List<T> {
    return new List(this._arr.concat(arr.ToArray()));
  }

  /**
   * Returns a new list containing only the distinct items from the list.
   * @returns A new list containing only the distinct items from the list.
   */
  public Distinct(): List<T> {
    return new List<T>(this._arr.filter(
      (item, index, self) =>
        index === self.findIndex((other) => item === other),
    ));
  }

  /**
   * Returns a new list containing only the distinct items from the list, using the given compare function.
   * @param compareFn - The function to use to compare items.
   * @returns A new list containing only the distinct items from the list.
   */
  public DistinctBy(compareFn: (a: T, b: T) => boolean): List<T> {
    return new List<T>(this._arr.filter(
      (item, index, self) =>
        index === self.findIndex((other) => compareFn(item, other)),
    ));
  }

  /**
   * Returns the first item in the list.
   * @returns The first item in the list.
   * @throws {Error} If the list is empty.
   */
  public First(): T {
    return this._arr[0];
  }

  /**
   * Returns the last item in the list.
   * @returns The last item in the list.
   * @throws {Error} If the list is empty.
   */
  public Last(): T {
    return this._arr[this._arr.length - 1];
  }

  /**
   * Groups the items of the list by the given compare function.
   * @param compareFn - The function to use to compare items.
   * @returns A new list containing the groups of items.
   * @example
   * const list = new List<{name: string, age: number}>([
   *   { name: 'John', age: 25 },
   *   { name: 'Jane', age: 25 },
   *   { name: 'Bob', age: 30 },
   *   { name: 'Alice', age: 30 },
   * ]);
   *
   * const groups = list.GroupBy((a, b) => a.age === b.age);
   *
   * console.log(groups);
   * // [
   * //   List[{name: 'John', age: 25}, {name: 'Jane', age: 25}],
   * //   List[{name: 'Bob', age: 30}, {name: 'Alice', age: 30}],
   * // ]
   */
  public GroupBy(compareFn: (a: T, b: T) => boolean): List<List<T>> {
    const groups: List<List<T>> = new List<List<T>>([]);

    this._arr.forEach((item) => {
      const group = groups.Find((g) => compareFn(g[0], item));

      if (group) {
        group.Add(item);
      } else {
        groups.Add(new List<T>([item]));
      }
    });

    return groups;
  }

  /**
   * Sorts the elements of the list in place and returns the sorted list.
   * The default sort order is ascending according to the string Unicode code points.
   * @param compareFn - Optional. A function that defines the sort order. If omitted, the array elements are sorted in ascending order, according to each element's Unicode code point value.
   * @returns A new list containing the elements in the sorted order.
   */
  public OrderBy(compareFn?: (a: T, b: T) => number): List<T> {
    return this.Sort(compareFn);
  }

  /**
   * Joins all elements of the list into a single string.
   * The elements are joined using the given separator string.
   * If the separator is not provided, the elements are separated by a comma.
   * @param separator - Optional. The separator string to use when joining the elements.
   * @returns A single string containing all the elements of the list.
   */
  // public Join(separator?: string): string {
  //   return this._arr.join(separator);
  // }

  /**
   * Joins all elements of the list into a single string.
   * The elements are joined using the given separator string.
   * If the separator is not provided, the elements are separated by a comma.
   * @param separator - Optional. The separator string to use when joining the elements.
   * @returns A single string containing all the elements of the list.
   */
  public Join(selector: (a: T) => string, separator?: string): string {
    const items = this._arr.map(selector);
    return items.join(separator);
  }

  [Symbol.iterator](): Iterator<T> {
    let index = 0;
    const items = this._arr;

    return {
      next(): IteratorResult<T> {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
