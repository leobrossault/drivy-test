/*
 * Return number of decimal in a float
 */
export default value => {
  if (value % 1 !== 0) {
    return value.toString().split('.')[1].length;
  }

  return 0;
};
