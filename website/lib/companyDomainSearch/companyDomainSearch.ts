function calculateDiceCoefficient(
  tokens1: string[],
  tokens2: string[]
): number {
  const intersection = tokens1.filter(token => tokens2.includes(token));
  const diceCoefficient =
    (2 * intersection.length) / (tokens1.length + tokens2.length);
  return diceCoefficient;
}

function isSimilarEnough(
  string1: string,
  string2: string,
  threshold: number
): boolean {
  const string1Tokens = string1.split(" ");
  const string2Tokens = string2.split(" ");

  const diceCoefficient = calculateDiceCoefficient(
    string1Tokens,
    string2Tokens
  );
  console.log(diceCoefficient);
  return diceCoefficient >= threshold;
}

export const doCompanyNamesMatch = (name1: string, name2: string) => {
  const threshold = 0.5;
  return isSimilarEnough(name1, name2, threshold);
};
