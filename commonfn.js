const compare = (a, b) => {
  let result = false;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      if (Math.abs(a[i][j] - b[i][j]) > Math.pow(10, -12)) {
        result = true
      }
    }
  }
  return result
}

const addmt = (a, b) => {
  return a.map(function(n, i){
    return n.map(function(o, j){
      return o + b[i][j];
    });
  });
}

const submt = (a, b) => {
  return a.map(function(n, i){
    return n.map(function(o, j){
      return o - b[i][j];
    });
  });
}

const mulmt = (a, b) => {
  let result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

const transposemt = m => m[0].map((x,i) => m.map(x => x[i]))

exports.compare = compare
exports.addmt = addmt
exports.mulmt = mulmt
exports.submt = submt
exports.transposemt = transposemt
