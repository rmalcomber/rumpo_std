/**
 * Represents a map of key-value pairs that expires entries after a specified time-to-live (ttl) period.
 * @template K - The type of the keys in the map.
 * @template V - The type of the values in the map.
 */
export class TTLMap<K, V> {
  private map = new Map<K, { value: V; expiresAt: number }>();
  private cleanupInterval: number;

  /**
   * Initializes a new instance of the TTLMap class.
   * Sets up a cleanup interval to periodically remove expired entries.
   */
  constructor() {
    this.cleanupInterval = setInterval(() => this.cleanupExpiredEntries(), 1);
  }

  /**
   * Adds or updates a value in the map with the given key.
   * The value will expire after the specified time-to-live (ttl) period.
   * @param key - The key of the value to add or update.
   * @param value - The value to add or update.
   * @param ttlMilliseconds - The time-to-live (ttl) period for the value in milliseconds.
   */
  set(key: K, value: V, ttlMilliseconds: number) {
    const expiresAt = Date.now() + ttlMilliseconds;
    this.map.set(key, { value, expiresAt });
  }

  /**
   * Retrieves the value associated with the given key if it exists and has not expired.
   * If the entry has expired, it is removed from the map.
   * @param key - The key of the value to retrieve.
   * @returns The value associated with the key, or undefined if the entry does not exist or has expired.
   */
  get(key: K): V | undefined {
    const entry = this.map.get(key);
    if (entry && entry.expiresAt > Date.now()) {
      return entry.value;
    }
    this.map.delete(key); // Clean up expired entry on access
    return undefined;
  }

  /**
   * Retrieves the entry associated with the given key if it exists and has not expired.
   * If the entry has expired, it is removed from the map.
   * @param key - The key of the entry to retrieve.
   * @returns An object containing the `expiresAt` timestamp and the `value` if the entry exists and has not expired, or undefined if the entry does not exist or has expired.
   */
  getE(key: K): { expiresAt: number; value: V } | undefined {
    const entry = this.map.get(key);
    if (entry && entry.expiresAt > Date.now()) {
      return entry;
    }
    this.map.delete(key); // Clean up expired entry on access
    return undefined;
  }

  /**
   * Removes the entry associated with the given key from the map.
   * @param key - The key of the entry to remove.
   * @returns `true` if the entry was found and removed, `false` otherwise.
   */
  delete(key: K): boolean {
    return this.map.delete(key);
  }

  /**
   * Removes all entries from the map.
   */
  clear() {
    this.map.clear();
  }

  /**
   * Checks if the map contains a key.
   * @param key - The key to check.
   * @returns `true` if the map contains the key, `false` otherwise.
   */
  has(key: K): boolean {
    return this.map.has(key);
  }

  /**
   * Returns the number of key-value pairs in the map.
   * @returns The size of the map.
   */
  size(): number {
    return this.map.size;
  }

  /**
   * Returns an iterator over the keys in the map.
   * @returns An iterator over the keys in the map.
   */
  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  /**
   * Returns an iterator over the values in the map.
   * The values are returned as an object with two properties: `expiresAt` and `value`.
   * `expiresAt` is the timestamp when the value will expire, and `value` is the value itself.
   * @returns An iterator over the values in the map.
   */
  values(): IterableIterator<{ expiresAt: number; value: V }> {
    return this.map.values();
  }

  /**
   * Returns an iterator over the entries in the map.
   * Each entry is an array where the first element is the key and the second element is an object with two properties: `expiresAt` and `value`.
   * `expiresAt` is the timestamp when the value will expire, and `value` is the value itself.
   * @returns An iterator over the entries in the map.
   */
  entries(): IterableIterator<[K, { expiresAt: number; value: V }]> {
    return this.map.entries();
  }

  /**
   * Calls the provided function once for each key-value pair present in the map.
   * The callback is called with three arguments: the value, the key, and the map.
   * The value is an object with two properties: `expiresAt` and `value`.
   * `expiresAt` is the timestamp when the value will expire, and `value` is the value itself.
   * @param callbackfn - The function to call for each entry in the map.
   */
  foreach(
    callbackfn: (
      value: {
        value: V;
        expiresAt: number;
      },
      key: K,
      map: Map<
        K,
        {
          value: V;
          expiresAt: number;
        }
      >,
    ) => void,
  ) {
    this.map.forEach(callbackfn);
  }

  private cleanupExpiredEntries() {
    const now = Date.now();
    for (const [key, { expiresAt }] of this.map.entries()) {
      if (expiresAt <= now) {
        this.map.delete(key);
      }
    }
  }

  /**
   * Releases all resources used by the TTLMap.
   * This method is called automatically when the TTLMap is garbage collected.
   * It is also possible to call this method directly to release resources.
   */
  dispose() {
    clearInterval(this.cleanupInterval);
    this.clear();
  }

  [Symbol.dispose]() {
    this.dispose();
  }
}
