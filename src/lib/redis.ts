const store = new Map<string, { value: string; expiresAt?: number }>();

export const redis = {
  async get(key: string): Promise<string | null> {
    const entry = store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      store.delete(key);
      return null;
    }
    return entry.value;
  },

  async set(key: string, value: string, options?: { ex?: number }): Promise<"OK"> {
    const expiresAt = options?.ex ? Date.now() + options.ex * 1000 : undefined;
    store.set(key, { value, expiresAt });
    return "OK";
  },

  async del(key: string): Promise<number> {
    const deleted = store.delete(key);
    return deleted ? 1 : 0;
  },

  async incr(key: string): Promise<number> {
    const valStr = await this.get(key);
    let val = valStr ? parseInt(valStr, 10) : 0;
    if (isNaN(val)) val = 0;
    val += 1;
    await this.set(key, val.toString());
    return val;
  },
};
