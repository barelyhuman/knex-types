import { test } from "uvu";
import * as asserts from "uvu/assert";
import knex from "knex";
import fs from "node:fs";
import { generateTypes } from "../src/index.js";

let knexInstance;

test.after(async () => {
  if (!knexInstance) return;
  await knexInstance.destroy();
});

test.before(async () => {
  knexInstance = knex({
    client: "sqlite",
    connection: ":memory:",
    useNullAsDefault: true,
  });

  await knexInstance.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("hello");
  });

  await knexInstance.schema.createTable("user_rel", (table) => {
    table.increments("id");
    table.text("hello");
    table.integer("user_id").references("id").inTable("users");
    table.timestamps(true, true);
    table.bigInteger("something_big");
    table.boolean("something_boolean");
    table.string("something_long");
  });
});

test("basic", async () => {
  await generateTypes(knexInstance, {
    output: "./test/snapshots/types.d.ts",
  });
  asserts.snapshot(
    await fs.promises.readFile("./test/snapshots/types.d.ts", "utf8"),
    `// GENERATED CODE, DO NOT MODIFY AS IT WILL BE REPLACED ON NEXT GENERATION
export type Users = {
    id:number;
    hello?:string;
}
export type UserRel = {
    id:number;
    hello?:string;
    user_id?:number;
    created_at:Date;
    updated_at:Date;
    something_big?:number;
    something_boolean?:boolean;
    something_long?:string;
}
`
  );
});

test.run();
