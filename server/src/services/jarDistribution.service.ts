export interface JarPercentages {
  necessities:      number;
  education:        number;
  longTermSaving:   number;
  play:             number;
  financialFreedom: number;
  give:             number;
}

export interface JarDistribution extends JarPercentages {
  dailyBudget: number;
}

export const DEFAULT_JAR_PERCENTAGES: JarPercentages = {
  necessities:      55,
  education:        10,
  longTermSaving:   10,
  play:             10,
  financialFreedom: 10,
  give:              5,
};

export function distributeJars(
  salary: number,
  percentages: JarPercentages,
  totalLoanEMI: number,
  daysInMonth = 30
): JarDistribution {
  const keys = Object.keys(percentages) as Array<keyof JarPercentages>;

  // Explicit types on acc and jar — fixes TS7006 implicit any errors
  const distributed = keys.reduce(
    (acc: JarPercentages, jar: keyof JarPercentages) => {
      acc[jar] = (salary * percentages[jar]) / 100;
      return acc;
    },
    { ...DEFAULT_JAR_PERCENTAGES }
  );

  // Deduct EMI from necessities jar, never go below 0
  distributed.necessities = Math.max(
    0,
    distributed.necessities - totalLoanEMI
  );

  const dailyBudget = distributed.necessities / daysInMonth;

  return { ...distributed, dailyBudget };
}
