class Cache {
    private store: Map<string, any> = new Map();
  
    set(key: string, value: any) {
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
  }
  
  const cache = new Cache();
  export default cache;