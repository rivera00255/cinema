const snakeToCamel = (obj: Object) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    return { ...acc, [camelKey]: value };
  }, {}) as any;
};

const camelize = (arr: Object[]) => {
  return arr.map((obj) => snakeToCamel(obj));
};

export { snakeToCamel, camelize };
