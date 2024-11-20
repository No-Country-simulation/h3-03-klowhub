type UnionKeys<T> = T extends T ? keyof T : never;

export type OneOf<T extends {}[]> = {
  [K in keyof T]: T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>;
}[number];
