export interface PersistenceAdapter<T> {
  load(): T[];
  save(items: T[]): void;
}
