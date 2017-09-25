require('console.table')
const { compare, addmt, mulmt } = require('./commonfn')

const x = 0.2 //alpha
const y = 0.6 //beta
const z = 0.7 //gamma

const B = [
  [1-x, 0, 0],
  [z*(1-x), (1-z)*(1-x), 0],
  [0, z*(1-x), (1-z)*(1-x)],
]
const C = [
  [x, 0, 0],
  [z*x, (1-z)*x, 0],
  [0, z*x, (1-z)*x],
]
const A0 = [
  [x*(1-y), 0, 0],
  [x*(1-y)*z, x*(1-y)*(1-z), 0],
  [0, x*(1-y)*x, x*(1-z)],
]
const A1 = [
  [(1-x)*(1-y), x*y, 0],
  [(1-x)*(1-y)*z, ((1-x)*(1-y)*(1-z))+(x*y*z), x*y*(1-z)],
  [0, (1-x)*(1-y)*z, ((1-x)*(1-y)*(1-z))+(x*y*z)],
]
const A2 = [
  [0, (1-x)*y, 0],
  [0, (1-x)*y*z, (1-x)*y*(1-z)],
  [0, 0, x*(1-y)*z],
]

// --------------------------- find R --------------------------- //
let base = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let R = A0.slice()
let i = 0
while (compare(base, R)) {
  base = R.slice()
  let buffer = addmt(A0, addmt(mulmt(R, A1), mulmt(R, mulmt(R, A2))))
  R = buffer.slice()
  i++
}

console.log('The value of R is:')
console.table(R)
console.log(`Iterate: ${i} times`)
// --------------------------- find R --------------------------- //
