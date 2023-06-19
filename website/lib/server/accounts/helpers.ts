export const generateRandomUsername = (): string => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let username = "";

  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      // Even index, add a letter
      const randomLetter =
        alphabet[Math.floor(Math.random() * alphabet.length)];
      username += randomLetter;
    } else {
      // Odd index, add a number
      const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
      username += randomNumber;
    }
  }

  return username;
};

function generateRandomSuffix(): number {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomUsernameFromName = (name: string): string => {
  return `${name.split(" ").join("")}${generateRandomSuffix()}`;
};

export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;

  if (!usernameRegex.test(username)) {
    return false;
  }

  return true;
};
