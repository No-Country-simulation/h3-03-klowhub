export type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;
type UnionKeys<T> = T extends T ? keyof T : never;
type NonNullable<T> = Exclude<T, null | undefined>;

export type OneOf<T extends object[]> = {
  [K in keyof T]: T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>;
}[number];

export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };
export type RequiredProperty<T> = { [P in keyof T]: Required<NonNullable<T[P]>>; };
