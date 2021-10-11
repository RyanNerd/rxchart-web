/**
 * @link https://stackoverflow.com/a/55032655/4323201
 */
export type Modify<T, R> = Omit<T, keyof R> & R;
