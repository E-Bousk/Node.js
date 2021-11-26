// console.log(arguments);
// console.log(require('module').wrapper);

// ********************
// ** MODULE.EXPORTS **
// ********************
// On récupère la classe depuis le fichier "test-module-1"
const C = require('./test-module-1');
// On instancie la classe dans "Calc1"
const calc1 = new C();
console.log(calc1.add(2, 5));


// ********************
// **    EXPORTS     **
// ********************
// // On à accès aux objets de 'exports'
// // "calc2" est maintenant l'objet 'exports'
// const calc2 = require('./test-module-2');
// console.log(calc2.multiply(6, 8));

// On peut aussi 'déstructurer' :
// (NOTE : les noms des variables doivent être identique à ceux exportés)
// (NOTE 2 : On n'est pas oubligé d'utiliser toutes les (3) propriétés)
const {add, multiply, divide} = require('./test-module-2');
console.log(divide(9, 3));


// ********************
// **    CACHING     **
// ********************
// On appelle la function directement (avec « () »)
// (on ne la stock pas dans une variable)
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

// RESULTAT :
// Hello from the module        // Apparait une seule fois (dans le code il n'y a qu'un console.log)
// Log this beautiful text 🎃  // Apparait une fois  (dans le code il n'y a qu'un console.log)
// Log this beautiful text 🎃  // Apparait une seconde fois (2eme appel) car mis en cache et retouvé
// Log this beautiful text 🎃  // Idem ---> pas eu besoin de reloader le module