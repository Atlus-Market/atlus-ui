export type ValueOf<T> = T[keyof T];

export type BinaryContent = string;

export type AbortThunkRequest = (reason?: string) => void;

export type DataImageURL = string;

export type ElementType<T extends Iterable<any>> = T extends Iterable<infer E> ? E : never;
