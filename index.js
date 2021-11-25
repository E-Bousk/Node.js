// On appelle le module FS (filesystem) que l'on met dans une variable
// On obtient ainsi un objet qui contient un tas de fonctionalités pour lire/écrire des fichiers
const fs = require('fs');

// 1er argument : le chemin du fichier, 2eme argument l'encodage des caractères (si rien de precisé, on obtient un 'buffer')
// Appeller cette fonction va lire le fichier et le mettre dans une variable 'textIn'
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log('textIn => ', textIn);

// Cette syntaxe (appellée TEMPLATE STRING : « `xxx ${} xxx` ») remplace la concaténation avec le signe « + ».
// « \n » sert à pour aller à la ligne suivante.
const textOut = `This is what we know about avocado: ${textIn}.\nCreaten on ${Date.now()}`;

// 1er argument : le fichier à creer, 2eme argument : le texte a écrire. Ici le texte mis dans la varible 'textOut'
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File created!');