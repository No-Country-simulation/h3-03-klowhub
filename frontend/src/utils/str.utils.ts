export const getSlug = (str: string) => {
  const toLower = str.toLowerCase();
  const withoutSpaces = toLower.replaceAll(' ', '-');
  return withoutSpaces
};
