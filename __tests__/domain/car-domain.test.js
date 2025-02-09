import {
  makeCarObject,
  race,
  isForwardOverFour,
  printWinners,
} from "../../src/domain";

jest.mock("readline");

describe("콘솔 게임을 실행 - domain 함수 검사사", () => {
  let randomSpy;
  beforeAll(async () => {
    randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterAll(() => {
    randomSpy.mockRestore();
  });

  describe("초기 상태 : car Location - (0,0,0)", () => {
    test("1. 자동차 경주는 5회로 고정하여 진행", () => {
      // given
      const carObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });
      const expectedGameCount = 5;

      // when
      const actualGameCount = race(carObjs, 5)[0].progress;

      // then
      expect(actualGameCount).toHaveLength(expectedGameCount);
    });

    test("2. 각 loop마다 자동차가 지나간 궤적을 기록", () => {
      // given
      const carObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });
      const expectedResult = [
        {
          name: 1,
          progress: ["O", "O", "O", "O", "O"],
        },
        {
          name: 2,
          progress: ["O", "O", "O", "O", "O"],
        },
        {
          name: 3,
          progress: ["O", "O", "O", "O", "O"],
        },
      ];

      // when
      const actualResult = race(carObjs, 5);

      // then
      expect(actualResult).toEqual(expectedResult);
    });

    test("2-1. 자동차가 지나간 궤적을 출력", () => {
      // given
      const carObjs = makeCarObject([1, 2, 3, 4, 5], { x: 0, y: 0, z: 0 });
      const expectedResultLength = 5;

      // when
      const actualResultLength = race(carObjs, 5)[0].progress;

      // then
      expect(actualResultLength).toHaveLength(expectedResultLength);
    });

    test("2-2. 전진하는 조건은 0에서 9 사이에서 무작위 값 중 4 이상인 경우", () => {
      // given
      randomSpy.mockReturnValue(0.8);
      const carObjs = makeCarObject([1, 2, 3, 4, 5], { x: 0, y: 0, z: 0 });
      const expectedResult = [true, true, true, true, true];

      // when
      const actualResult = carObjs.map(() => isForwardOverFour());

      // then
      expect(actualResult).toEqual(expectedResult);
    });

    test("2-3. 경기 완료 후, 우승자를 출력한다.", () => {
      // given
      randomSpy.mockReturnValue(0.8);
      const carObjs = makeCarObject([1, 2, 3, 4, 5], { x: 0, y: 0, z: 0 });
      const expectedResult = ["1", "2", "3", "4", "5"];

      // when
      const gameResult = race(carObjs, 5);
      const actualResult = printWinners(gameResult);

      // then
      expect(actualResult).toEqual(expectedResult);
    });

    test("3. 사용자가 잘못된 이름을 작성한 경우, 프로그램을 종료", () => {
      // given
      expect(() => {
        makeCarObject(["!!", 2, 3, 4, 5], { x: 0, y: 0, z: 0 });
      }).toThrow("생성할 수 없는 이름입니다.");
    });
  });
});
