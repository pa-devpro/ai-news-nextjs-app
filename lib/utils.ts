export const toKebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};
