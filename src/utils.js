function validCoords(coords) {
  return coords[0] >= -180 && coords[0] <= 180 && coords[1] >= -90 && coords[1] <= 90;
}

function plural(number, one, two, five, isShowNumber = true) {
  let n = Math.abs(number);
  n %= 100;

  const quantity = isShowNumber ? number : '';

  if (n >= 5 && n <= 20) {
    return `${quantity} ${five}`;
  }

  n %= 10;
  if (n === 1) {
    return `${quantity} ${one}`;
  }

  if (n >= 2 && n <= 4) {
    return `${quantity} ${two}`;
  }

  return `${quantity} ${five}`;
}

function coordinateMatch(a, b) {
  a = a.geometry.coordinates;
  b = b.geometry.coordinates;
  return (a.join() === b.join()) ||
    a[0].toFixed(3) === b[0].toFixed(3) &&
    a[1].toFixed(3) === b[1].toFixed(3);
}

function wrap(n) {
  var d = 180 - -180;
  var w = ((n - -180) % d + d) % d + -180;
  return (w === -180) ? 180 : w;
}

function roundWithOriginalPrecision(input, original) {
  let precision = 0;
  if (Math.floor(original) !== original) {
    precision = original.toString().split('.')[1].length;
  }
  return input.toFixed(Math.min(precision, 5));
}

function createPoint(coordinates, properties) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: coordinates
    },
    properties: properties ? properties : {}
  };
}

const format = {
  duration(s) {
    var m = Math.floor(s / 60),
      h = Math.floor(m / 60);
    s %= 60;
    m %= 60;
    if (h === 0 && m === 0) return s + 's';
    if (h === 0) return plural(m, 'минута', 'минуты', 'минут');
    return `${plural(h, 'час', 'часа', 'часов')} ${plural(m, 'минута', 'минуты', 'минут')}`;
  },

  imperial(m) {
    var mi = m / 1609.344;
    if (mi >= 100) return mi.toFixed(0) + 'mi';
    if (mi >= 10) return mi.toFixed(1) + 'mi';
    if (mi >= 0.1) return mi.toFixed(2) + 'mi';
    return (mi * 5280).toFixed(0) + 'ft';
  },

  metric(m) {
    const plurIt = (value) => plural(value, 'километр', 'километра', 'километров');
    if (m >= 100000) return plurIt((m / 1000).toFixed(0));
    if (m >= 10000) return  plurIt((m / 1000).toFixed(1));
    if (m >= 100) return plurIt((m / 1000).toFixed(2));
    return plural(m.toFixed(0), 'метр', 'метра', 'метров');
  }
};

export default { format, coordinateMatch, createPoint, validCoords, wrap, roundWithOriginalPrecision };
