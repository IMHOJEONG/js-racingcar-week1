export const makeToArray = (string) =>
  string.split(",").map((val) => val.trim());

export const printWithCarName = (carName, result) => {
  const printFormat = `${carName}: ${result}`;
  console.log(`${printFormat}`);

  return printFormat;
};

export const isNameLessThanThreshold = (items, threshold) =>
  items.every((item) => (item+"").length <= threshold);

export const printMessage = (string) => {
  console.log(string);
};

export const START_RACE_MESSAGE = "경주할 자동차 이름을 입력하세요.";
export const FINISH_RACE_MESSAGE = "경주를 완료했습니다.";
export const PRINT_WINNER_INTRO_MESSAGE = "우승자는 다음과 같습니다.";

export const printExceedNameLength = (length) =>
  `자동차 이름이 ${length}자를 초과합니다.`;

export const printWinnerMessage = (winner) =>
  winner ? `${winner}가 최종 우승했습니다.` : `우승자가 존재하지 않습니다`;

export const SEPARATED_COMMA = ",";
export const isRandomOverThanInteger = (min, max, threshold) => Math.floor(Math.random() * (max+1)) + min >= threshold;

export const getCars = async (read) => {
  const carName = await read.question(`${START_RACE_MESSAGE}\n`);
  printMessage("");
  return carName;
};