/**
 * Add a specificied string to the beginning of another string if it doesn't exist.
 * @export
 * @param {string} str
 * @param {string} stringToAdd
 * @return {*}  {string}
 * @example
 * const input = " World";
 * const resp = ensureStringStartsWith(input, "Hello");
 *
 * console.log(resp); // Hello world
 */
export function ensureStringStartsWith(
  str: string,
  stringToAdd: string,
): string {
  if (!str.startsWith(stringToAdd)) {
    str = stringToAdd + str;
  }

  return str;
}
/**
 * Add a specificied string to the end of another string if it doesn't exist.
 * @export
 * @param {string} str
 * @param {string} stringToAdd
 * @return {*}  {string}
 * @example
 * const input = "Hello ";
 * const resp = ensureStringEndsWith(input, "world");
 *
 * console.log(resp); // Hello world
 */
export function ensureStringEndsWith(str: string, stringToAdd: string): string {
  if (!str.endsWith(stringToAdd)) {
    str = str + stringToAdd;
  }

  return str;
}

/**
 * Get a file extension from a string path with the "." included
 *
 * @export
 * @param {string} filePath
 * @return {*}  {string}
 * @example
 * const input = "/path/myFile.mp4";
 * const resp = getFileDotExtension(input);
 *
 * console.log(resp); // .mp4
 */
export function getFileDotExtension(filePath: string): string {
  const lastIndex = filePath.lastIndexOf(".");
  if (lastIndex !== -1 && lastIndex < filePath.length - 1) {
    return filePath.substring(lastIndex);
  }

  return "";
}

/**
 * Get a file extension from a string without the "." included
 *
 * @export
 * @param {string} filePath
 * @return {*}  {string}
 * @example
 * const input = "/path/myFile.mp4";
 * const resp = getFileExtension(input);
 *
 * console.log(resp); // mp4
 */
export function getFileExtension(filePath: string): string {
  const dotExtension = getFileDotExtension(filePath);

  if (dotExtension.length > 0) {
    return dotExtension.substring(1);
  }

  return "";
}
