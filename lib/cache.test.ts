import cache from './cache';

describe('Cache', () => {
    // let cache: Cache;

    beforeEach(() => {
        cache.clear()
    });

    test('should set and get a value', () => {
        cache.set('key1', 'value1');
        expect(cache.get('key1')).toBe('value1');
    });

    test('should return undefined for a non-existent key', () => {
        expect(cache.get('nonExistentKey')).toBeUndefined();
    });

    test('should check if a key exists', () => {
        cache.set('key2', 'value2');
        expect(cache.has('key2')).toBe(true);
        expect(cache.has('nonExistentKey')).toBe(false);
    });

    test('should return all key-value pairs', () => {
        cache.set('key3', 'value3');
        cache.set('key4', 'value4');
        expect(cache.getAll()).toEqual([['key3', 'value3'], ['key4', 'value4']]);
    });

    test('should clear all key-value pairs', () => {
        cache.set('key5', 'value5');
        cache.clear();
        expect(cache.getAll()).toEqual([]);
    });
});