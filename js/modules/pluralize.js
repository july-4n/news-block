/* eslint-disable max-len */
export const pluralize = (count, forms, res = false) => {
  let resultForm;

  if (res) {
    resultForm = count % 10 === 1 && count % 100 !== 11 ? forms[0] : (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20) ? forms[2] : forms[1]);
  } else {
    resultForm = count % 10 === 1 && count % 100 !== 11 ? forms[0] : forms[1];
  }
  return resultForm;
};
