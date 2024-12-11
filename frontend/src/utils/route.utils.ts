// these are server only functions

import { headers } from "next/headers";

// for this to work the /src/middleware.ts should set the corresponding header
export const getQueryParams = async () => {
  const headerList = await headers();
  const queryString = headerList.get("x-current-query-string") || '';
  const searchParams = new URLSearchParams(queryString);

  const params = Array.from(searchParams).reduce<{[key: string]: string}>((acc, curr) => {
    return { ...acc, [curr[0]]: curr[1] }
  }, {})

  return params;
};

export const getPathname = async () => {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path") || '';
  return pathname
};

