import Car from "../src/Car.js";

describe("자동차는 위치 값을 가진다.", () => {
  beforeAll(() => {
    console.log("자동차 위치 테스트 시작");
  });

  afterAll(() => {
    console.log("자동차 위치 테스트 끝");
  });

  

  describe("초기 상태 : car Location - (0,0,0)", () => {
    test("getName(), getLocation() 호출 - 초기 이름, 위치 값 설정", () => {
      // given
      const name = "hojeong";
      const location = {
        x: 0,
        y: 0,
        z: 0,
      };
      const expectedName = "hojeong";
      const expectedLocation = {
        x: 0,
        y: 0,
        z: 0,
      };

      // when
      const car = new Car(name, location);
      const actualName = car.getName();
      const actualLocation = car.getLocation();

      // then
      expect(actualName).toEqual(expectedName);
      expect(actualLocation).toMatchObject(expectedLocation);
    });
  });

  describe("적절한 상태인지 검사 : car Location - (-1,-1,-1)", () => {
    test("비공개 함수인 setLocation 메서드 호출", () => {
      // given
      const name = "hojeong";
      const location = {
        x: -1,
        y: -1,
        z: -1,
      };

      const expectedThrownData = "설정할 수 없는 위치입니다."

      // then
      expect(() => {
        // FIXME -> goTo When
        new Car(name, location).getName();
      }).toThrow(expectedThrownData);
    })
  })
});
