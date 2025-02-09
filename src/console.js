import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Car from "./Car.js";
import { LOCATION_POINT } from "./rule.js";

export const makeToArray = (string) =>
  string.split(",").map((val) => val.trim());

export const isNameLessThanFive = (items) =>
  items.every((item) => item.length <= 5);

export const getCars = async (read) => {
  const carName = await read.question("경주할 자동차 이름을 입력하세요.");
  return carName;
};

export const checkCarNames = (cars) => {
  if (isNameLessThanFive(cars) === false) {
    throw new Error("자동차 이름이 5자를 초과합니다.");
  }
};

export const makeCarObject = (cars, position) =>
  cars.map((name) => new Car(name, position));

export const printWithCarName = (carName, result) => `${carName}: ${result}`;

export const print = (cars, results) => {
  const newResult = cars.map((car, index) =>
    results.map((row) => row[index]).join(""),
  );

  cars.forEach((car, index) => {
    console.log(printWithCarName(car.getName(), newResult[index]));
  });

  return newResult;
};

export const isForwardOverFour = () => Math.floor(Math.random() * 10) >= 4;

export const isForward = (car) => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  const isCar = car instanceof Car;

  // x - 1, y - 2, z - 3
  if (isCar && isForwardOverFour()) {
    return randomNumber;
  }

  // stop - 0
  return 0;
};

export const race = (carObjs, gameCount) => {
  const goDirection = (car) => {
    if (isForward(car) === 1) {
      car.goToX();
      return LOCATION_POINT.x;
    }
    if (isForward(car) === 2) {
      car.goToY();
      return LOCATION_POINT.y;
    }
    if (isForward(car) === 3) {
      car.goToZ();
      return LOCATION_POINT.z;
    }

    return LOCATION_POINT.stop;
  };

  const carResults = Array.from({ length: gameCount }).reduce((gameResult) => {
    const results = carObjs.map((car) => goDirection(car));

    gameResult.push(results);
    console.log("");
    print(carObjs, gameResult);
    console.log("");
    return gameResult;
  }, []);
  return carResults;
};

export const printExitMessage = (string) => {
  console.log(string);
};

export const printWinners = (carObjs, results) => {
  const newResult = carObjs.map((car, index) =>
    results.map((row) => row[index]).join(""),
  );

  const result = {};

  carObjs.forEach((car, index) => {
    const filteredResult = newResult[index].replace("O", "").length;
    result[car.getName()] = filteredResult;
  });

  const keyValueArray = Object.entries(result);
  const valueArray = Object.values(result);

  const maxValue = Math.max(...valueArray);
  const filteredWinners = keyValueArray
    .filter(([, value]) => value === maxValue)
    .map((item) => item.at(0));

  const commaJoinedString = filteredWinners.join(",");

  console.log(`${commaJoinedString}가 최종 우승했습니다.`);

  return filteredWinners;
};

export const play = async () => {
  const read = readline.createInterface({
    input,
    output,
  });

  const carName = await getCars(read);

  const cars = makeToArray(carName);

  checkCarNames(cars);

  const carObjs = makeCarObject(cars, { x: 0, y: 0, z: 0 });

  const gameResult = race(carObjs, 5);

  printExitMessage("경주를 완료했습니다.");
  printExitMessage("우승자는 다음과 같습니다.");

  printWinners(carObjs, gameResult);

  read.close();
};
