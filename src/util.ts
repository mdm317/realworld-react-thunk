const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getMonth = (month: number) => {
  return monthList[month - 1];
};
export const getMonthDate = (date: string): string => {
  //2016-02-18T03:22:56.637Z
  const monthstr = date.substr(5, 2);
  const monthnum = Number(monthstr);
  const month = getMonth(monthnum);
  return month + " " + date.substr(8, 2) + "th";
};
