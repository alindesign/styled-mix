export function nonNullableArray<T extends any>(array: T[]): NonNullable<T>[] {
    return array.filter<NonNullable<T>>((item): item is NonNullable<T> => !!item);
}
