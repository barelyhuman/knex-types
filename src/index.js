import { SchemaInspector } from "knex-schema-inspector";
import fs from "node:fs";
import { resolve } from "node:path";
import { batchResolve } from "./lib/promise.js";
import { getTypeName } from "./lib/strings.js";

const pad = "".padStart(4, " ");

/**
 * @typedef {object} Options
 * @property {import("stream").Writable | string} output
 */

/**
 * @param {import("knex").knex} knexConnection
 * @param {Options} options
 */
export async function generateTypes(knexConnection, { output } = {}) {
  const outputWriter =
    typeof output === "string"
      ? fs.createWriteStream(resolve(output), {
          flags: "w",
          encoding: "utf8",
        })
      : output;

  const writer = createWriter(outputWriter);

  const inspector = SchemaInspector(knexConnection);
  const allTables = await inspector.tables();
  const columnsWithTablesPromises = allTables.map(async (table) => {
    const columnInfo = await inspector.columnInfo(table);
    return {
      table: table,
      columns: columnInfo,
    };
  });
  const columnsWithTables = await batchResolve(columnsWithTablesPromises, 5);

  await writer(
    "// GENERATED CODE, DO NOT MODIFY AS IT WILL BE REPLACED ON NEXT GENERATION\n"
  );

  columnsWithTables.forEach((tableDef) => {
    const typeName = getTypeName(tableDef.table);
    outputWriter.write(`export type ${typeName} = {\n`);

    tableDef.columns.forEach((c) => {
      const columnConstruct = [c.name];

      if (c.is_nullable) {
        columnConstruct.push("?");
      }

      switch (c.data_type) {
        case "varchar":
        case "character varying":
        case "character":
        case "char":
        case "nvarchar":
        case "text": {
          columnConstruct.push(":string");
          break;
        }
        case "boolean": {
          columnConstruct.push(":boolean");
          break;
        }
        case "int":
        case "bigint":
        case "integer": {
          columnConstruct.push(":number");
          break;
        }
        case "timestamp without time zone":
        case "datetime2":
        case "date":
        case "datetime": {
          columnConstruct.push(":Date");
        }
      }
      const typeInfo = columnConstruct.concat(";", "\n").join("");

      outputWriter.write(`${pad}${typeInfo}`);
    });
    outputWriter.write(`}\n`);
  });

  outputWriter.end();
}

function createWriter(stream) {
  return (data) => {
    return new Promise((resolve) => {
      stream.write(data, function (err) {
        if (err) return rejects(err);
        resolve();
      });
    });
  };
}
