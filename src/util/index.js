export const makeToArray = (string) =>
  string.split(",").map((val) => val.trim());

export const printWithCarName = (carName, result) => {
  const printFormat = `${carName}: ${result}`;
  console.log("");
  console.log(printFormat);
  console.log("");

  return printFormat;
};

export const isNameLessThanFive = (items) =>
  items.every((item) => item.length <= 5);

export const printExitMessage = (string) => {
  console.log(string);
};
