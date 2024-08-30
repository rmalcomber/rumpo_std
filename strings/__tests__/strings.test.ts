import { assertEquals } from "@std/assert";

import {
  ensureStringEndsWith,
  ensureStringStartsWith,
  getFileDotExtension,
  getFileExtension,
} from "../main.ts";

Deno.test("Test Get File Dot Extension", () => {
  const testPath = "/hello/file.png";
  assertEquals(getFileDotExtension(testPath), ".png");
  assertEquals(getFileDotExtension("noextension"), "");
});

Deno.test("Test Get File Extension", () => {
  const testPath = "/hello/file.png";
  assertEquals(getFileExtension(testPath), "png");
  assertEquals(getFileExtension("noextension"), "");
});

Deno.test("Ensure Strings Start With", () => {
  const input = ".png";
  const input2 = "png";
  const input3 = "-world";
  const input4 = "hello-world";

  assertEquals(ensureStringStartsWith(input, "."), ".png");
  assertEquals(ensureStringStartsWith(input2, "."), ".png");
  assertEquals(ensureStringStartsWith(input3, "hello"), "hello-world");
  assertEquals(ensureStringStartsWith(input4, "hello"), "hello-world");
});

Deno.test("Ensure Strings End With", () => {
  const input = "helloworld";
  const input2 = "hello";
  const input3 = "25";
  const input4 = "25$";

  assertEquals(ensureStringEndsWith(input, "world"), "helloworld");
  assertEquals(ensureStringEndsWith(input2, "world"), "helloworld");
  assertEquals(ensureStringEndsWith(input3, "$"), "25$");
  assertEquals(ensureStringEndsWith(input4, "$"), "25$");
});
