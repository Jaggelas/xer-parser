# XER Parser

XER Parser is a library for parsing Primavera P6 XER files. It provides a set of tools to read data from XER files.

**NOTE !!** This library is still very early in development and should not be used in production.

## Table of Contents

- [XER Parser](#xer-parser)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [XER-Parser Api](#xer-parser-api)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

You can install the library using npm:

```sh
npm install xer-parser
```

## Usage

Here's a basic example of how to use the XER Parser. The constructor expects the XER file contents as a string.

Node (ESM):

```ts
import { readFile } from 'node:fs/promises';
import { XER } from 'xer-parser';

const text = await readFile('path/to/file.xer', 'utf8');
const xer = new XER(text);

console.log(xer.projects);
console.log(xer.tasks.normalTasks.length);
```

Browser (client-side upload):

```ts
import { XER } from 'xer-parser';

const input = document.querySelector('input[type=file]')!;
const file = input.files?.[0];
const text = await file!.text();
const xer = new XER(text);
console.log(xer.projects.length);
```

Streaming (Node or browser with ReadableStream):

```ts
import { XER, readableStreamToAsyncIterable } from 'xer-parser';

// Node: using fs to get a Readable and convert to AsyncIterable of chunks
import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';

// For web streams, pass the ReadableStream to readableStreamToAsyncIterable
// For Node streams, wrap into an async generator
async function* nodeReadableToAsyncIterable(readable: Readable) {
  for await (const chunk of readable) {
    yield chunk as Buffer;
  }
}

const readable = createReadStream('path/to/file.xer');
const xer = await XER.fromStream(nodeReadableToAsyncIterable(readable));
console.log(xer.projects.length);
```

## XER-Parser API

To be completed..

### Schema registry and type safety

The loader uses a strongly-typed schema registry to enforce constructor and property key alignment at compile time. The registry lives in `src/schemas/schema-registry.ts` and lists every table with its target property and class constructor.

Key points:

- Every schema class must have a constructor of the form `(xer, header, row)`.
- Each registry entry maps a table name to a property on `XER` and the class constructor.
- The `TASK` table wraps items into the `Tasks` collection via the `wrap` callback.

Adding a new schema:

1. Create `src/schemas/MySchema.ts` with a constructor `(xer, header, row)`.
2. Add a property to `XERData` (in `src/types/schema.ts`) if it represents a new top-level collection.
3. Register it in `src/schemas/schema-registry.ts` by adding an entry `{ table, key, ctor }` (and `wrap` if the property isn’t a raw array).

On build, TypeScript validates:

- The constructor signature via `SchemaConstructor<T>`.
- The `key` matches an `XER` property with compatible element type.

This keeps the loader wiring correct and prevents drift as schemas evolve.

### Saving an updated XER

Node (ESM):

```ts
import { readFile, writeFile } from 'node:fs/promises';
import { XER } from 'xer-parser';

const text = await readFile('path/to/file.xer', 'utf8');
const xer = new XER(text);

// ... mutate data, e.g., xer.tasks[0].taskName = 'New Name';

const out = xer.toXERString();
await writeFile('path/to/output.xer', out, 'utf8');
```

Bun:

```ts
import { XER } from 'xer-parser';

const text = await Bun.file('path/to/file.xer').text();
const xer = new XER(text);

// ... mutate data

const out = xer.toXERString();
await Bun.write('path/to/output.xer', out);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.

Feel free to adjust the content as needed to better fit your project.
