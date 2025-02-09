import Car from "../Car.js";

import { printWithCarName, isNameLessThanFive } from "../util/index.js";
import { LOCATION_POINT } from "../rule.js";

export const getCars = async (read) => {
  const carName = await read.question("경주할 자동차 이름을 입력하세요.\n");
  return carName;
};

export const checkCarNames = (cars) => {
  if (isNameLessThanFive(cars) === false) {
    throw new Error("자동차 이름이 5자를 초과합니다.");
  }
};

export const makeCarObject = (cars, position) =>
  cars.map((name) => new Car(name, position));

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

export const printWinners = (gameResults) => {
  const result = {};

  gameResults.forEach((perGameResult) => {
    const { name, progress } = perGameResult;
    const filteredResult = progress.filter((val) => val !== "O").length;
    result[name] = filteredResult;
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

export const race = (carObjs, gameCount) => {
  let totalResult = carObjs.map((car) => ({
    carObject: car,
    name: car.getName(),
    progress: [],
  }));

  Array.from({ length: gameCount }).forEach(() => {
    const results = totalResult.map((car) => {
      const newProgress = goDirection(car.carObject);
      const carResult = {
        ...car,
        progress: [...car.progress, newProgress],
      };
      printWithCarName(carResult.name, carResult.progress);
      return carResult;
    });

    totalResult = results;
  });

  return totalResult;
};
