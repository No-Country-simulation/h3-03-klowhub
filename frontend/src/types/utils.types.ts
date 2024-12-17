import { SelectOption } from "@/components/input/input.types";
import { TDocument, TImage, TVideo } from "./global.types";

export type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;
type UnionKeys<T> = T extends T ? keyof T : never;
type NonNullable<T> = Exclude<T, null | undefined>;

export type OneOf<T extends object[]> = {
  [K in keyof T]: T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>;
}[number];

export type BTEntity<T> = {
  [K in keyof T]: 
    T[K] extends (SelectOption | null) ? string 
  : T[K] extends SelectOption[] ? string[]
  : T[K] extends (TImage | TVideo | TDocument)[] ? string[]
  : T[K] extends TImage | TVideo | null ? string
  : T[K]
}

export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };
export type RequiredProperty<T> = { [P in keyof T]: Required<NonNullable<T[P]>>; };
