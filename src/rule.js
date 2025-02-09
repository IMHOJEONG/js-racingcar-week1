const carNameRule = /^[a-zA-Z0-9]{1,9}$/;

// FIXME: Please Write This Test Code
const carLocationRule = {
  x: /[0-100]/,
  y: /[0-100]/,
  z: /[0-100]/,
};

// 0,1,2,3
const DIRECTION = {
  x: 1,
  y: 2,
  z: 3,
  stop: 0,
}

const LOCATION_POINT = {
  x: "X",
  y: "Y",
  z: "Z",
  stop: "STOP",
};

const FORWARD_CONDITION = {
  min: 0,
  max: 9,
  threshold: 4
}

export { carNameRule, carLocationRule, LOCATION_POINT, DIRECTION, FORWARD_CONDITION };
