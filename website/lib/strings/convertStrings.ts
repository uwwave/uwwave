export const convertToCamelCase = (input: string): string => {
  const words = input.split(" ");

  const camelCased = words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  return camelCased;
};
