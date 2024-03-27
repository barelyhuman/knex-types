/**
 * @typedef {object} Options
 * @property {import("stream").Writable | string} output
 */
/**
 * @param {import("knex").knex} knexConnection
 * @param {Options} options
 */
export function generateTypes(knexConnection: typeof import("knex"), { output }?: Options): Promise<void>;
export type Options = {
    output: import("stream").Writable | string;
};
