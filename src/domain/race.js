import Car from "../Car.js";

import {
  isNameLessThanThreshold,
  printExceedNameLength,
  printMessage,
  printWinnerMessage,
  printWithCarName,
  SEPARATED_COMMA,
  isRandomOverThanInteger
} from "../util/index.js";
import { DIRECTION, FORWARD_CONDITION, LOCATION_POINT } from "../rule.js";

export const checkCarNames = (cars) => {
  if (isNameLessThanThreshold(cars, 5) === false) {
    throw new Error(printExceedNameLength(5));
  }
};

export const makeCarObject = (cars, position) =>
  cars.map((name) => new Car(name, position));


export const isForward = (car) => {
  
  const isCar = car instanceof Car;
  if (isCar && isRandomOverThanInteger(FORWARD_CONDITION.min, FORWARD_CONDITION.max, FORWARD_CONDITION.threshold)) {

    // x - 1, y - 2, z - 3
    const DIRECTION_LENGTH = Object.keys(DIRECTION).length
    const xyzDirection = Math.floor(Math.random() * DIRECTION_LENGTH) + 1;
    return xyzDirection;
  }

  // stop - 0
  return DIRECTION.stop;
};


export const goDirection = (car, direction) => {
  
  if (direction === DIRECTION.x) {
    car.goToX();
    return LOCATION_POINT.x;
  }
  if (direction === DIRECTION.y) {
    car.goToY();
    return LOCATION_POINT.y;
  }
  if (direction === DIRECTION.z) {
    car.goToZ();
    return LOCATION_POINT.z;
  }

  return LOCATION_POINT.stop;
};

export const printWinners = (gameResults) => {
  const result = {};

  gameResults.forEach((perGameResult) => {
    const { name, progress } = perGameResult;
    const filteredResult = progress.filter(
      (val) => val !== LOCATION_POINT.stop,
    ).length;
    result[name] = filteredResult;
  });

  const keyValueArray = Object.entries(result);
  const valueArray = Object.values(result);

  const maxValue = Math.max(...valueArray);
  const filteredWinners = keyValueArray
    .filter(([, value]) => value === maxValue)
    .map((item) => item.at(0));

  const commaJoinedString = filteredWinners.join(SEPARATED_COMMA);

  console.log(printWinnerMessage(commaJoinedString));

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
      const newProgress = goDirection(car.carObject, isForward(car.carObject));
      const carResult = {
        ...car,
        progress: [...car.progress, newProgress],
      };

      printWithCarName(carResult.name, carResult.progress);

      return carResult;
    });

    totalResult = results;
    printMessage("");
  });
  return totalResult;
};
