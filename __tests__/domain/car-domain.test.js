import Car from "../../src/Car.js";
import {

  makeCarObject,
  printWinners,
  race,
  checkCarNames,
  goDirection
} from "../../src/domain/index.js";
import { DIRECTION, FORWARD_CONDITION, LOCATION_POINT } from "../../src/rule.js";
import { isRandomOverThanInteger } from "../../src/util/index.js";

jest.mock("readline");

describe("콘솔 게임을 실행 - domain 함수 검사", () => {

  let randomSpy;
  beforeAll(async () => {
    randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterAll(() => {
    randomSpy.mockRestore();
  });


  describe("초기 상태 : car Location - (0,0,0)", () => {
  
    test("0. 대상 자동차를 생성한다.", () => {
      // export const makeCarObject = (cars, position) =>
      //   cars.map((name) => new Car(name, position));
      const actualCarObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });

      expect(actualCarObjs[0]).toBeInstanceOf(Car);
      expect(actualCarObjs[1]).toBeInstanceOf(Car);
      expect(actualCarObjs[2]).toBeInstanceOf(Car);


    });
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
      randomSpy.mockReturnValue(0.2);
      const carObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });
      const expectedProgress = Array.from({ length: 5 }).fill(
        LOCATION_POINT.stop,
      );
      const expectedResult = [
        {
          carObject: new Car(1, { x: 0, y: 0, z: 0 }),
          name: 1,
          progress: expectedProgress,
        },
        {
          carObject: new Car(2, { x: 0, y: 0, z: 0 }),
          name: 2,
          progress: expectedProgress,
        },
        {
          carObject: new Car(3, { x: 0, y: 0, z: 0 }),
          name: 3,
          progress: expectedProgress,
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
      const actualResult = carObjs.map(() => isRandomOverThanInteger(FORWARD_CONDITION.min, FORWARD_CONDITION.max, FORWARD_CONDITION.threshold));

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
    test("3-1. 사용자가 길이 5이상 이름 작성 시, 에러를 출력", () => {
      // given
      const names = ['1', '2', '3'];
      const numberNames = [1,2,3]
      const overFiveLengthNames = [123456]

      expect(() => {
        checkCarNames(names)
      }).not.toThrow("생성할 수 없는 이름입니다.");
      
      expect(() => {
        checkCarNames(numberNames)
      }).not.toThrow("생성할 수 없는 이름입니다.");
      
      expect(() => {
        checkCarNames(overFiveLengthNames)
      }).not.toThrow("생성할 수 없는 이름입니다.");
    });

    describe("이동 방향 검사", ()=>{
      test("4-1. x축으로 이동하였는지 검사", () => {
     
        const carObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });
        const oneCar = goDirection(carObjs[0], DIRECTION.x);
  
        expect(oneCar).toBe("X")
      });
      test("4-2. y축으로 이동하였는지 검사", () => {
       
        const carObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });
        const oneCar = goDirection(carObjs[0], DIRECTION.y);
  
        expect(oneCar).toBe("Y")
      });
      test("4-2. z축으로 이동하였는지 검사", () => {
       
        const carObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });
        const oneCar = goDirection(carObjs[0], DIRECTION.z);
  
        expect(oneCar).toBe("Z")
      });
    })
   
  });
});
