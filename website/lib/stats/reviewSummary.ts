export const calculatePercentile = (
  companySalaries: number[],
  allSalaries: number[]
): number => {
  const sortedSalaries = allSalaries.slice().sort((a, b) => a - b);
  const count = sortedSalaries.length;

  const rank = companySalaries.reduce((acc, salary) => {
    let i = 0;
    while (i < count && sortedSalaries[i] <= salary) {
      i++;
    }
    return acc + i;
  }, 0);

  return (rank / (count * companySalaries.length)) * 100;
};
