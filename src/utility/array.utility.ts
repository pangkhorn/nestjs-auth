/**
 * Array filter pipeline
 * @param value
 * @param index
 * @param self
 * @returns boolean
 */
export const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
};
