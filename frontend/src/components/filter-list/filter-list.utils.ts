import { TFilterItem } from "@/types/filters.types";

export const breakFilters = (filters: TFilterItem[]) => {
  if (filters.length <= 2) return [ filters ];

  const breakPoint = Math.ceil((filters.length - 1) / 2);
  const row1 = filters.slice(0, breakPoint);
  const row2 = filters.slice(breakPoint, filters.length - 1);
  return [ row1, row2 ]
};

