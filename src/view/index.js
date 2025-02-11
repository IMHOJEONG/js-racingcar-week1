import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import {
  printMessage,
  makeToArray,
  FINISH_RACE_MESSAGE,
  PRINT_WINNER_INTRO_MESSAGE,
  getCars
} from "../util/index.js";
import {
  printWinners,
  checkCarNames,
  makeCarObject,
  race,
} from "../domain/index.js";

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

  printMessage(FINISH_RACE_MESSAGE);
  printMessage(PRINT_WINNER_INTRO_MESSAGE);

  printWinners(gameResult);

  read.close();
};

export default play;
