const carNameRule = /^[a-zA-Z0-9]{1,9}$/;

// FIXME: Please Write This Test Code
const carLocationRule = {
  x: /[0-100]/,
  y: /[0-100]/,
  z: /[0-100]/,
};

const LOCATION_POINT = {
  x: "X",
  y: "Y",
  z: "Z",
  stop: "O",
};

export { carNameRule, carLocationRule, LOCATION_POINT };
