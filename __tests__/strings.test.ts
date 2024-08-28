import { assertEquals } from '@std/assert';

import {
  ensureStringEndsWith,
  ensureStringStartsWith,
  getFileDotExtension,
  getFileExtension,
} from '../strings.ts';

Deno.test("Test Getting Extension from Path", ()=>{

    const testPath = "/hello/file.png";

    assertEquals(getFileDotExtension(testPath), '.png');
    assertEquals(getFileExtension(testPath), 'png');

})

Deno.test("Add string if not exists", ()=>{
    let input = ".png";
    let input2 = "png";
    let input3 = "-world"
    let input4 = "hello-world"


    assertEquals(ensureStringStartsWith(input, '.'), ".png");
    assertEquals(ensureStringStartsWith(input2, '.'), ".png");
    assertEquals(ensureStringStartsWith(input3, 'hello'), "hello-world");
    assertEquals(ensureStringStartsWith(input4, 'hello'), "hello-world");

    input = 'helloworld';
    input2 = 'hello';
    input3 = '25',
    input4 = '25$'

    assertEquals(ensureStringEndsWith(input, 'world'), "helloworld");
    assertEquals(ensureStringEndsWith(input2, 'world'), "helloworld");
    assertEquals(ensureStringEndsWith(input3, '$'), "25$");
    assertEquals(ensureStringEndsWith(input4, '$'), "25$");
})