// // ************************************
// // *****   Gestion de fichiers    *****
// // ************************************
// // On appelle le module FS (filesystem) que l'on met dans une variable
// // On obtient ainsi un objet qui contient un tas de fonctionalités pour lire/écrire des fichiers
// const fs = require('fs');

// // ////////////////////////////////////
// // //   Blocking, synchronous way    //
// // ////////////////////////////////////
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

// // ////////////////////////////////////
// // // Non-blocking, asynchronous way //
// // ////////////////////////////////////
// // 1er argument : le chemin du fichier, 2eme argument l'encodage des caractères, 3eme argument : une 'callback function'
// // *** Comportement asynchrone : NODEJS commence à lire le fichier en background,
// // et dès qu'il sera prêt, il démarrera la fonction (callback) spécifiée en 2nd argument...
// // (cette 'callback function' a deux arguments : 1er = ERReur et 2nd = DATA)
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   console.log('data => ', data);
// });
// // ... en attendant, NodeJS ne bloque pas le code et poursuit : 
// // c'est pourquoi ce console log apparait avant l'autre ***
// console.log('This console log will prompt before the previous one with data');


// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.error('ERROR! 💥', err);
  
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('File created 😎');
//       });
//     });
//   });
// });
// console.log('Will read file!');


// // ************************************
// // *****  Creation d'un serveur   *****
// // ************************************
// //On inclus un autre module/package (appellé HTTP)
// const http = require('http');

// // On utilise la méthode "createServer" qui est dans l'objet "http"
// // À chaques requêtes sur le serveur, une 'callback function' sera appelée
// // cette 'callback function' a deux arguments : 1er REQuest et 2nd RESponse
// const server = http.createServer((req, res) => {
//   res.end('Hello 👋 from the server!');
// });

// // Méthode "listen" démarre le serveur et écoute les connections/requêtes
// // 1er paramètre : le port, 2ème : le host, 3eme optionel : une 'callback function' 
// // (qui sera exécutée dès que le serveur aura commencé à écouter)
// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to requests on port 8000');
// });

// // ************************************
// // *****   Creation d'un router   *****
// // ************************************
// const fs = require('fs');
// const http = require('http');

// // On utilise le build-in node module "url"
// const url = require('url');


// // On utilise la version synchrone car ce code n'est exécuté qu'une seule fois (au démarrage de l'appli)
// // (donc on supprime la callback function. ++ voir commentaire plus bas ++)
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataObj = JSON.parse(data)


// const server = http.createServer((req, res) => {
//   console.log('req.url => ', req.url);

//   const pathName = req.url;
//   if (pathName === '/' || pathName === '/overview') {
//     res.end('This is the OVERVIEW');
//   } else if (pathName === '/product') {
//     res.end('This is the PRODUCT');
//   } else if (pathName === '/api') {
//     // ++ Cette partie de code commentée est déplacée en haut pour n'être exécuter qu'une seule fois (au démarrage de l'appli) ++
//     // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
//     //   const productData = JSON.parse(data)
//     //   // console.log('productData => ', productData);
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(data);
//     // });
//   } else {
//     res.writeHead(404, {
//       'Content-type': 'text/html',
//       'my-own-header': 'hello-world'
//     });
//     res.end('<h1>Page not found!</h1>');
//   }
// });

// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to requests on port 8000');
// });




const fs = require('fs');             // Core module
const http = require('http');         // Core module
const url = require('url');           // Core module

// On récupère "SLUGIFY" dans une variable
const slugify = require('slugify');   // Third-party module

// On importe le module que l'on a créé (et exporté)
const replaceTemplate = require('./modules/replaceTemplate'); // Own module


// ++ On charge les fichiers TEMPLATE au démarrage de l'application ++
// (on ne les charge qu'une seule fois, pas besoin de les charger à chaques appels)
// en mode 'syncho' car on est au 'top level' du code
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
// console.log('dataObj => ', dataObj);

// On crée un tableau avec tous les slugs
// Pour chaque ELément du tableau, on 'slugify' le "productName" 
const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
// console.log('slugs => ', slugs);

const server = http.createServer((req, res) => {
  // console.log('req.url => ', req.url);
  // console.log('url.parse(req.ul) => ', url.parse(req.url, true));

  // On 'destructure' l'objet "url.parse(req.url, true)"
  // On créer 2 variables avec les 2 noms de ses propriétés
  const { query, pathname } = url.parse(req.url, true);
  // console.log('query => ', query);

  // **********************
  // *** OVERVIEW  page ***
  // **********************
  if (pathname === '/' || pathname === '/overview') {
    // On charge le fichier "template-overview" au démarrage de l'application
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // [La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction 
    // fournie sur chaque élément du tableau appelant.]
    // "replaceTemplate" va prendre, dans "templateCard", l'élément courant "el" (qui contient les données) 
    // * cette fonction est crée en haut du code *
    // DONC : on boucle sur "dataObj" (qui contient tous les produits) et à chaque itérations, 
    // on remplace les placeholders dans le 'templateCard' avec le produit courant ('el')
    // NOTE : une fonction flêchée sans accolades retourne explicitement le résultat. C'est comme si on avait un "return" ici
    // "cardsHTML" étant un tableau, pour avoir une chaîne de caractère, on utilise la fonction « join() »
    const cardsHtml =  dataObj.map(el => replaceTemplate(templateCard, el)).join('');
    // console.log('cardsHtml => ', cardsHtml);

    // On remplace maintenant le placeholder "{%PRODUCT_CARD%}" du fichier "template-overview" avec le string "cardsHtml"
    const output = templateOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
    res.end(output);


  // **********************
  // ***  PRODUCT page  ***
  // **********************
  } else if (pathname === '/product') {
    // console.log(query);

    // On récupère le produit que l'on veut afficher
    const product = dataObj[query.id]
    // console.log('dataObj.query => ', dataObj[query.id]);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    const output = replaceTemplate(templateProduct, product)

    res.end(output);

  // **********************
  // ***    API page    ***
  // **********************
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);

  // **********************
  // **  NOT FOUND page  **
  // **********************
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});