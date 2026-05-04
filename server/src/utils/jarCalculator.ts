export const DEFAULT_JAR_PERCENTAGES = {
  necessities: 55,
  education: 10,
  longTermSaving: 10,
  play: 10,
  financialFreedom: 10,
  give: 5,
};

export function getDaysInMonth(month: string) {
  const [year, monthNum] = month.split('-').map(Number);
  return new Date(year, monthNum, 0).getDate();
}
