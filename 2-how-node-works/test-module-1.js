// On utilise "module.exports" pour exporter une valeur unique
// (ici, la classe "Calculator")


// ******************
// ** 1ere version **
// ******************
// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   multiply(a, b) {
//     return a * b;
//   }

//   divide(a, b) {
//     return a / b;
//   }
// }

// module.exports = Calculator;



// ******************
// ** 2eme version **
// ******************
module.exports = class {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }
};
