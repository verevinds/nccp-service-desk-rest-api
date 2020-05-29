module.exports = (Op) => {
  const toFirstLettersUppercase = (name) => {
    return name
      .split(' ')
      .map((item) =>
        item ? item[0].toUpperCase() + item.slice(1).toLowerCase() : ``,
      )
      .join(' ')
      .trim();
  };

  const toLetterUppercase = (name) => {
    return name
      .split(' ')
      .map((item, index) => {
        if (!index) {
          return item
            ? item[0].toUpperCase() + item.slice(1).toLowerCase()
            : ``;
        } else {
          return item
            ? item[0].toLowerCase() + item.slice(1).toLowerCase()
            : ``;
        }
      })
      .join(' ')
      .trim();
  };

  Op.filter = (name) => {
    return {
      [Op.or]: [
        { [Op.like]: `%${name}%` },
        { [Op.like]: `%${toLetterUppercase(name)}%` },
        { [Op.like]: `%${toFirstLettersUppercase(name)}%` },
        { [Op.like]: `%${name.toUpperCase()}%` },
        { [Op.like]: `%${name.toLowerCase()}%` },
      ],
    };
  };
};
