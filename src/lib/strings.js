/**
 * @param {string} toConv
 */
export const camelCase = (toConv) => {
  return toConv
    .split(/[ -_]/)
    .map((x) => x.toLowerCase())
    .map((x, i) => {
      if (i == 0) {
        return x;
      }
      return firstUpper(x);
    })
    .join("");
};

/**
 *
 * @param {string} toConv
 * @returns
 */
export const firstUpper = (toConv) => {
  return toConv.charAt(0).toUpperCase() + toConv.slice(1);
};

/**
 * @param {string} tableName 
 * @returns 
 */
export const getTypeName = tableName=>{
  return firstUpper(camelCase(tableName))
}