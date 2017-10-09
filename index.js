require('console.table')
const { compare, addmt, mulmt, submt, transposemt } = require('./commonfn')
const invmt = require('matrix-inverse');
const mathjs = require('mathjs')

const iterate = 6

const x = 0.2 //alpha
const y = 0.6 //beta
const z = 0.7 //gamma
const ix = 1 - x
const iy = 1 - y
const iz = 1 - z

const B = [
  [   ix,     0,      0],
  [ z*ix, iz*ix,      0],
  [    0,  z*ix,  iz*ix],
]
const C = [
  [   x,    0,    0],
  [ z*x, iz*x,    0],
  [   0,  z*x, iz*x],
]
const A0 = [
  [   x*iy,        0,     0],
  [ x*iy*z,  x*iy*iz,     0],
  [      0,   x*iy*z,  x*iz],
]
const A1 = [
  [   ix*iy,                x*y,                   0],
  [ ix*iy*z, (ix*iy*iz)+(x*y*z),              x*y*iz],
  [       0,            ix*iy*z,  (ix*iy*iz)+(x*y*z)],
]
const A2 = [
  [0,   ix*y,       0],
  [0, ix*y*z, ix*y*iz],
  [0,      0,  ix*y*z],
]

// --------------------------- find R --------------------------- //

let base = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let R = A0.slice()
let i = 1
while (compare(base, R)) {
  base = R.slice()
  let buffer = addmt(A0, addmt(mulmt(R, A1), mulmt(R, mulmt(R, A2))))  // A0 + RA1 + R^2A2
  R = buffer.slice()
  i++
}

console.log('The value of R is:')
console.table(R)
console.log(`Iterate: ${i} times`)

// --------------------------- find BR -------------------------- //

const A1_RA2 = addmt(A1, mulmt(R, A2)) // A1 + RA2

const BR = [
  [ B[0][0],  B[0][1],  B[0][2], C[0][0], C[0][1], C[0][2]],
  [ B[1][0],  B[1][1],  B[1][2], C[1][0], C[1][1], C[1][2]],
  [ B[2][0],  B[2][1],  B[2][2], C[2][0], C[2][1], C[2][2]],
  [A2[0][0], A2[0][1], A2[0][2], A1_RA2[0][0], A1_RA2[0][1], A1_RA2[0][2]],
  [A2[1][0], A2[1][1], A2[1][2], A1_RA2[1][0], A1_RA2[1][1], A1_RA2[1][2]],
  [A2[2][0], A2[2][1], A2[2][2], A1_RA2[2][0], A1_RA2[2][1], A1_RA2[2][2]],
]

const I = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
]

console.log('The value of BR is:')
console.table(BR)

// --------------------------- find (I-BR)' -------------------------- //

const I_BR = submt(I, BR) // I - BR
console.log('The value of (I-BR) is:')
console.table(I_BR)

const M = transposemt(I_BR) // (I - BR)'
console.log('The value of (I-BR)^t is:')
console.table(M)

// --------------------------- find U -------------------------- //

const I2 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
]
const I3 = [[1], [1], [1]]
const U = [1, 1, 1]

mulmt(mathjs.inv(submt(I2, R)), I3).map(e => U.push(e[0])) // ((I - R)^t)*I

console.log('The value of U is:')
console.table(U)

// --------------------------- find MU -------------------------- //

const MU = M.slice()
MU[5] = U

console.log('The value of MU is:')
console.table(MU)

// --------------------------- find X -------------------------- //

const X = mulmt(mathjs.inv(MU), [[0], [0], [0], [0], [0], [1]])
const X0 = X.slice(0,3)
const X1 = X.slice(3,6)
console.log('The value of X is:')
console.table(X)
console.log('The value of X0 is:')
console.table(X0)
console.log('The value of X1 is:')
console.table(X1)

const DistX = [X0, X1]

let XD = X1.slice()
for (let i = 2; i <= iterate; i++) {
  let buffer = mulmt(XD, R)
  const buffer2 = buffer.map((e) => {
    let sum = 0;
    e.map(a => {
      return sum += a
    })
    return [sum]
  })
  console.log(`The value of X${i} is:`)  
  console.table(buffer2)
  XD = buffer2.slice()
  DistX.push(buffer2)  
}

// --------------------------- find Distribution X -------------------------- //
console.log(`The value of Distribution X is:`)  
console.table(DistX)

