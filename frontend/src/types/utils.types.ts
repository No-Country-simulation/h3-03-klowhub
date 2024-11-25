export type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;
type UnionKeys<T> = T extends T ? keyof T : never;

export type OneOf<T extends object[]> = {
  [K in keyof T]: T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>;
}[number];
