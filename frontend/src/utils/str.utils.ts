export const getSlug = (str: string) => {
  const toLower = str.toLowerCase();
  const withoutSpaces = toLower.replaceAll(' ', '-');
  return withoutSpaces
};

export const truncate = (str: string, limit: number = 80) => {
  const truncated = str.length > limit ? str.slice(0, limit) + '...' : str;
  return truncated
}

export const getYoutubeId = (url: string) => {
  const rawUrl = new URL(url);   
  const searchParams = new URLSearchParams(rawUrl.search);
  const videoId = searchParams.get("v");

  return videoId
};
