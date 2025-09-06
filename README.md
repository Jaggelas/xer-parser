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

Bun:

```ts
import { XER } from 'xer-parser';

const file = Bun.file('path/to/file.xer');
const text = await file.text();
const xer = new XER(text);

console.log(xer.projects);
console.log(xer.tasks.completed.length);
```

## XER-Parser API

To be completed..

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.

Feel free to adjust the content as needed to better fit your project.
