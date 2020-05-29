exports.toFirstLettersUppercase = (name) => {
  return name
    .split(' ')
    .map((item) =>
      item ? item[0].toUpperCase() + item.slice(1).toLowerCase() : ``,
    )
    .join(' ')
    .trim();
};
exports.toLetterUppercase = (name) => {
  return name
    .split(' ')
    .map((item, index) => {
      if (!index) {
        return item ? item[0].toUpperCase() + item.slice(1).toLowerCase() : ``;
      } else {
        return item ? item[0].toLowerCase() + item.slice(1).toLowerCase() : ``;
      }
    })
    .join(' ')
    .trim();
};
