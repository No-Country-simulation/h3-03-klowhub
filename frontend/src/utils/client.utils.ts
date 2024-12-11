import { ReadonlyURLSearchParams } from "next/navigation";

export const updateSearchParams = (key: string, value: string, searchParams: ReadonlyURLSearchParams) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value)
  return params.toString()
};
