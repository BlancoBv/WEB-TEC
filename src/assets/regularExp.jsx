function regularExp(pattern, test) {
  const regExp = new RegExp(pattern);

  return regExp.test(test);
}

export const replaceString = (pattern, input, replace) => {
  const replacedString = input.replace(pattern, replace);
  return replacedString;
};

export default regularExp;
