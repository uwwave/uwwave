export const validateLocation = (name?: string): boolean => {
  if (!name) {
    return true;
  }
  if (name.startsWith("Remote")) {
    return true;
  }

  if (name.split(",").length) {
    return true;
  }

  return false;
};
