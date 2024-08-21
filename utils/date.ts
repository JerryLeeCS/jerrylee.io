export const getMonthYear = (date: Date) => {
  return `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;
};
