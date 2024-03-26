/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    input: "./src/index.js",
    output: {
      sourcemap: true,
      dir: "dist",
      format: "cjs",
      entryFileNames: "[name].cjs",
    },
  },
  {
    input: "./src/index.js",
    output: {
      sourcemap: true,
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].mjs",
    },
  },
];
