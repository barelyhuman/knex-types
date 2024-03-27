# @barelyhuman/knex-types

> Generate Model types from Knex

- [@barelyhuman/knex-types](#barelyhumanknex-types)
  - [Schema Support](#schema-support)
  - [Usage](#usage)
  - [License](#license)

## Schema Support

While the below checklist mentions **Partial**, most of what the library can generate should be usable. It says partial because things like `enum` and other constraints that can be used to generate better types and models for knex are still not done.

- [x] Sqlite
- [ ] Postgres (Partial)
- [ ] MSSQL (Partial)
- [ ] Oracle (Partial)

## Usage

```js
// in CJS
import { generateTypes } from "@barelyhuman/knex-types";
const knexInstance = knex(config);

generateTypes(knexInstance, {
  output: "./types.d.ts",
}).then((d) => {
  // Done
});
```

```js
// in ESM
import { generateTypes } from "@barelyhuman/knex-types";
const knexInstance = knex(config);
await generateTypes(knexInstance, {
  output: "./types.d.ts",
});
```

## License

[MIT](/LICENSE)
