# @barelyhuman/knex-types

> Generate Schema types from Knex

- [@barelyhuman/knex-types](#barelyhumanknex-types)
  - [Schema Support](#schema-support)
  - [Usage](#usage)
  - [License](#license)

## Schema Support

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
