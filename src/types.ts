export type ValueOf<T> = T[keyof T];

export type BinaryContent = string;

export type AbortThunkRequest = (reason?: string) => void;
