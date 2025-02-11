const carNameRule = /^[a-zA-Z0-9]{1,9}$/;

const locationRegex = /^(0|[1-9][0-9]?|100)$/;

const carLocationRule = {
  x: locationRegex,
  y: locationRegex,
  z: locationRegex,
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
