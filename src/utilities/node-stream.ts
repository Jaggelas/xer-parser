/**
 * Convert a Node.js Readable stream into an AsyncIterable.
 * Uses minimal typing to avoid depending on @types/node.
 */
export async function* nodeReadableToAsyncIterable<T = Uint8Array>(readable: any): AsyncGenerator<T> {
  for await (const chunk of readable as AsyncIterable<any>) {
    yield chunk as T;
  }
}
