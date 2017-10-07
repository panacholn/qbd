require('console.table')
const { compare, addmt, mulmt } = require('./commonfn')

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
  [      0,   x*iy*x,  x*iz],
]
const A1 = [
  [   ix*iy,                x*y,                   0],
  [ ix*iy*z, (ix*iy*iz)+(x*y*z),              x*y*iz],
  [       0,            ix*iy*z,  (ix*iy*iz)+(x*y*z)],
]
const A2 = [
  [0,   ix*y,       0],
  [0, ix*y*z, ix*y*iz],
  [0,      0,  x*iy*z],
]

// --------------------------- find R --------------------------- //
let base = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let R = A0.slice()
let i = 1
while (compare(base, R)) {
  console.table(R)
  base = R.slice()
  let buffer = addmt(A0, addmt(mulmt(R, A1), mulmt(R, mulmt(R, A2))))
  R = buffer.slice()
  i++
}

console.log('The value of R is:')
console.table(R)
console.log(`Iterate: ${i} times`)
// --------------------------- find R --------------------------- //
