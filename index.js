// On appelle le module FS (filesystem) que l'on met dans une variable
// On obtient ainsi un objet qui contient un tas de fonctionalités pour lire/écrire des fichiers
const fs = require('fs');

// *******************************
// ** Blocking, synchronous way **
// *******************************

// // 1er argument : le chemin du fichier, 2eme argument l'encodage des caractères (si rien de precisé, on obtient un 'buffer')
// // Appeller cette fonction va lire le fichier et le mettre dans une variable 'textIn'
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log('textIn => ', textIn);

// // Cette syntaxe (appellée TEMPLATE STRING : « `xxx ${} xxx` ») remplace la concaténation avec le signe « + ».
// // « \n » sert à pour aller à la ligne suivante.
// const textOut = `This is what we know about avocado: ${textIn}.\nCreaten on ${Date.now()}`;

// // 1er argument : le fichier à créer, 2eme argument : le texte a écrire. Ici le texte mis dans la varible 'textOut'
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File created!');


// ************************************
// ** Non-blocking, asynchronous way **
// ************************************
// // 1er argument : le chemin du fichier, 2eme argument l'encodage des caractères, 3eme argument : une 'callback function'
// // *** Comportement asynchrone : NODEJS commence à lire le fichier en background,
// // et dès qu'il sera prêt, il démarrera la fonction (callback) spécifiée en 2d argument...
// // (cette 'callback function' a deux arguments : 1er = ERReur et 2nd = DATA)
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   console.log('data => ', data);
// });
// // ... en attendant, NodeJS ne bloque pas le code et poursuit : 
// // c'est pourquoi ce console log apparait avant l'autre ***
// console.log('This console log will prompt before the previous one with data');


fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.error('ERROR! 💥', err);
  
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3);

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('File created 😎');
      });
    });
  });
});
console.log('Will read file!');
