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

Here's a basic example of how to use the XER Parser:

```sh
import { XER } from 'xer-parser';
import { readXER } from 'xer-parser';

const fileURL = 'path/to/your/file.xer';

const file = Bun.file(fileURL)

const xer = new XER(file.text())

console.log(xer.projects);
console.log(xer.tasks);

```

## XER-Parser Api

To be completed..

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.

Feel free to adjust the content as needed to better fit your project.
