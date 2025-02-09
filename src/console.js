import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { printExitMessage, makeToArray } from "./util/index.js";
import {
  printWinners,
  getCars,
  checkCarNames,
  makeCarObject,
  race,
} from "./domain/index.js";

const play = async () => {
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

  printWinners(gameResult);

  read.close();
};

export default play;
