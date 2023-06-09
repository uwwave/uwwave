const leetCodeRegex =
  /^https?:\/\/leetcode\.com\/problems\/([a-zA-Z0-9-]+)\/?(?:\?.*)?$/;

export const validateLeetCodeUrl = (url: string): boolean => {
  // Check if the URL matches the pattern
  if (leetCodeRegex.test(url)) {
    return true;
  }

  return false;
};

export const leetcodeNameFromURL = (url: string): string => {
  // Check if the URL matches the pattern
  const match = url.match(leetCodeRegex);
  if (match && match[1]) {
    const problemName = match[1];
    return problemName.split("-").join(" ");
  }

  return url;
};
