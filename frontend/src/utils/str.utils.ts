export const getSlug = (str: string) => {
  const toLower = str.toLowerCase();
  const withoutSpaces = toLower.replaceAll(' ', '-');
  return withoutSpaces
};

export const truncate = (str: string, limit: number = 80) => {
  const truncated = str.length > limit ? str.slice(0, limit) + '...' : str;
  return truncated
}
