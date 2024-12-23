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

export const strForDisplay = (str: string) => {
  const toUpperCase = str.slice(0, 1).toUpperCase() + str.slice(1)
  const replaceHyphens = toUpperCase.replaceAll("-", " ");

  return replaceHyphens
}

export const removeHtmlTags = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent?.trim() || "";
};
