export const deepGet = (obj, path) =>
  path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

export const deepSet = (obj, path, value) => {
  if (!path || typeof path !== "string") return undefined;
  const keys = Array.isArray(path) ? path : path.split(".");
  const root = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = root;

  keys.forEach((k, i) => {
    const last = i === keys.length - 1;
    if (last) {
      cur[k] = value;
      return;
    }

    const nextKey = keys[i + 1];
    const existing = cur[k];
    const shouldBeArray = !isNaN(Number(nextKey));

    if (existing === undefined) {
      cur[k] = shouldBeArray ? [] : {};
    } else {
      cur[k] = Array.isArray(existing) ? [...existing] : { ...existing };
    }

    cur = cur[k];
  });

  return root;
};

export const getNested = (obj, path) => {
  if (!path || typeof path !== "string") return undefined;
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}