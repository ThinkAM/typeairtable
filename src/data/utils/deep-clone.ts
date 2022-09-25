export function deepClone(obj, hash = new WeakMap()) {
  if (Object(obj) !== obj) return obj;
  if (hash.has(obj)) return hash.get(obj);
  const result =
    obj instanceof Set
      ? new Set(obj)
      : obj instanceof Map
      ? new Map(Array.from(obj, ([key, val]) => [key, deepClone(val, hash)]))
      : obj instanceof Date
      ? new Date(obj)
      : obj instanceof RegExp
      ? new RegExp(obj.source, obj.flags)
      : obj.constructor
      ? new obj.constructor()
      : Object.create(null);
  hash.set(obj, result);
  return Object.assign(
    result,
    ...Object.keys(obj).map((key) => ({ [key]: deepClone(obj[key], hash) }))
  );
}
