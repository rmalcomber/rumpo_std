import { TTLMap } from "../main.ts";

import { delay } from "@std/async";
import { assert } from "@std/assert";

Deno.test("Test TTL Map", async () => {
  using map = new TTLMap<string, string>();

  map.set("key1", "value1", 1000);
  map.set("key2", "value2", 10000);

  await delay(2000);

  assert(map.get("key1") === undefined);
  assert(map.get("key2") === "value2");
});
