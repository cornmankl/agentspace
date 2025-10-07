import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { PersistenceAdapter } from './PersistenceAdapter.js';

export class JsonFileStore<T> implements PersistenceAdapter<T> {
  constructor(private readonly filePath: string) {
    mkdirSync(dirname(this.filePath), { recursive: true });
  }

  load(): T[] {
    if (!existsSync(this.filePath)) {
      return [];
    }

    const contents = readFileSync(this.filePath, 'utf-8');
    if (!contents.trim()) {
      return [];
    }

    try {
      return JSON.parse(contents) as T[];
    } catch (error) {
      throw new Error(`Failed to parse persisted data at ${this.filePath}: ${(error as Error).message}`);
    }
  }

  save(items: T[]): void {
    writeFileSync(this.filePath, JSON.stringify(items, null, 2), 'utf-8');
  }
}
