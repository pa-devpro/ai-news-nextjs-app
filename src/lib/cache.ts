class Cache {
  private store: Map<string, unknown> = new Map();

  set(key: string, value: unknown) {
    this.store.set(key, value);
  }

  get(key: string) {
    return this.store.get(key);
  }

  has(key: string) {
    return this.store.has(key);
  }

  getAll() {
    return Array.from(this.store.entries());
  }

  clear() {
    this.store.clear();
  }
}

const cache = new Cache();
export default cache;
