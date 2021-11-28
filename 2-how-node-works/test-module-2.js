// Alternative à module.exports :
// ajouter des propriétés à l'objet exporté

// on crée (ici) trois fonctions anonymes
// et on les assigne à trois propriétés de 'exports'
exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;