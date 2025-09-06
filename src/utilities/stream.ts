/**
 * Convert a Web ReadableStream (e.g., from Bun.file().stream()) into an AsyncIterable.
 * This avoids pulling the entire file into memory and plugs directly into parseStream.
 *
 * Note: typed with `any` for maximum compatibility without requiring DOM lib types.
 */
export async function* readableStreamToAsyncIterable<T = Uint8Array>(stream: any): AsyncGenerator<T> {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value as T;
    }
  } finally {
    try { reader.releaseLock?.(); } catch {}
    try { await stream.cancel?.(); } catch {}
  }
}
