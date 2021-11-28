// const replaceTemplate = (template, product) => {   // remplacé par « module.exports = (template, product) => { »
module.exports = (template, product) => {
  // On 'exporte' la fonction "replaceTemplate" qui devient une fonction anonyme (elle perd son nom)
  // On l'assigne dans la propriété "export" de l'objet "module".
  // (On peut acceder à cet objet dans chaque/tous les modules NodeJS (chaque fichier .js est un module)
  // On peut donc l'importer dans le fichier "index.js")
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  
  return output;
}