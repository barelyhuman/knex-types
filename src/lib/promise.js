/**
 * @template T
 * @param {Array<Promise<T>>} promises
 * @param {number} batchLimit
 * @returns {Promise<Array<T>>}
 */
export const batchResolve = async (promises, batchLimit = 2) => {
  const totalBatches = Math.ceil(promises.length / batchLimit);
  const batches = promises.reduce((acc, item, index) => {
    const batchIndex = Math.floor(index / batchLimit);
    if (!acc[batchIndex]) {
      acc[batchIndex] = [];
    }
    acc[batchIndex].push(item);
    return acc;
  }, new Array(totalBatches));
  /**
   * @type {Array<T>}
   */
  let results = [];
  for (let batch of batches) {
    const _result = await Promise.all(batch);
    results = results.concat(_result);
  }
  return results;
};
