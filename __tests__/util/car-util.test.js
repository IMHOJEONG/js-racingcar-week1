import {
  makeToArray,
  isNameLessThanFive,
  printWithCarName,
} from "../../src/util";

import readline from "../../__mocks__/readline";

jest.mock("readline");

describe("콘솔 게임을 실행", () => {
  let read;
  let randomSpy;
  beforeAll(async () => {
    read = readline.createInterface();
    randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterAll(() => {
    randomSpy.mockRestore();
  });

  describe("초기 상태 : car Location - (0,0,0)", () => {
    test("1. 자동차에 이름을 부여한다.", async () => {
      const input = "경주할 자동차 이름을 입력하세요.";
      const carName = "car1";
      const expectedCarName = ["car1"];

      const response = await read.question(input, carName);
      const actualCarName = makeToArray(response);

      expect(actualCarName).toEqual(expectedCarName);
    });

    test("1-1. 자동차 여러 대의 이름을 부여한다. - 쉼표를 기준", async () => {
      const input = "경주할 자동차 이름을 입력하세요.";
      const carName = "car1, car2, car3";
      const expectedCarName = ["car1", "car2", "car3"];

      const response = await read.question(input, carName);
      const actualCarName = makeToArray(response);
      expect(actualCarName).toEqual(expectedCarName);
    });

    test("2-1. 자동차 여러 대의 이름을 부여한다. - 5자 이하만 가능", async () => {
      const input = "경주할 자동차 이름을 입력하세요.";
      const carName = "car1, car2, car345";
      const expectedResult = false;

      const response = await read.question(input, carName);
      const actualResult = isNameLessThanFive(makeToArray(response));
      expect(actualResult).toBe(expectedResult);
    });

    it("4-1. 전진하는 자동차를 출력 시, 자동차 이름을 같이 출력", async () => {
      // given
      const carName = 1;
      const result = ["Y", "Y", "Y"];
      const expectedResult = "1: Y,Y,Y";

      // when
      const actualResult = printWithCarName(carName, result);
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
