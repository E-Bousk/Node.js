// ******************************************************************************************
// ***************                      CALLBACK  HELL                        ***************
// ******************************************************************************************
// ** On a une callback fonction dans une callback fonction dans une callback fonction ... **
// ******************************************************************************************

// On require le module "filesystem" pour lire notre fichier
const fs = require('fs');

// On require "superagent"
const superagent = require('superagent');

// // [On lit le fichier texte] de manière asynchrone
// // On passe le chemin du fichier et une callback function
// // qui sera appelée dès qu'on aura fini de lire le fichier
// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   console.log(`The breed is (got from the file) : « ${data} »`);

//   // [On fait une requete HTTP "get" sur une API pour récupérer une image]
//   // On doit aussi utiliser la méthode "end ()" dans laquelle on met une fonction callback
//   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
//     // en cas d'erreur, on n'écrit rien dans le fichier, car on est sorti grâce au "return"
//     if (err) return console.error(err.message);
//     // (NOTE : la réponse attendue est dans "body" et on veux juste la valeur de "message")
//     console.log(res.body.message);

//     // [On sauvegarde l'URL dans un fichier texte]
//     // (‼ On va donc devoir faire une troisième fonction callback imbriquée ‼)
//     // On passe le nom du fichier à créer et le texte à y insérer
//     // puis une callback function (qui aura juste une ERReur)
//     fs.writeFile('dog-img.txt', res.body.message, (err) => {
//       // en cas d'erreur, on n'écrit rien dans le fichier, car on est sorti grâce au "return"
//       if (err) return console.error(err.message);
//       console.log('Random dog image saved to file !');
//     });
//   });
// });

// ******************************************************************************************
// ***************                         PROMISES                           ***************
// ******************************************************************************************
// *****   https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises.   *****
// ******************************************************************************************
// *****   On va pouvoir enchaîner les promesses (au lieu d'imbriquer les callbacks)    *****
// ******************************************************************************************

// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   console.log(`The breed is (got from the file) : « ${data} »`);

//   superagent
//     // Avec le "get" on a une promesse. pour la 'consommer' on utilise la méthode ".then()"
//     // dans laquel on passe une fonction callback qui sera appellé
//     // dès que la promesse aura finit son travail et sera revenue avec les données.
//     // Ces données sont alors valable comme un argument de cette callback (appellé RESult)
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.error(err.message);
//         console.log('Random dog image saved to file !');
//       });
//     // On chaîne une méthode "catch" pour gerer les promesses qui n'aboutissent pas (erreur)  
//     }).catch(err => {
//       console.error(err.message);
//     })
// });


// ******************************************************************************************
// ***********      'promessifions' les fonctions lire et écrire un fichier      ***********
// ******************************************************************************************
// ** Faire qu'elles retournent des promesses au lieu que nous leur passions des callbacks **
// ******************************************************************************************

// // On veut une fonction (lire in fichier) qui retourn une promesse
// // et qui ne reçoit qu'un nom de fichier (pas de callback)
// const readFilePromise = file => {
//   // on utilise le 'PromiseConstructor' (introduit depuis ES6)
//   // qui embarque une fonction "executor" qui est appellée dès que la promesse est crée
//   // cette fonction prend deux arguments ("resolve" et "reject") qui sont des fonctions
//   return new Promise((resolve, reject) => {
//     // C'est là qu'on appelle fs.readFile
//     fs.readFile(file, (err, data) => {
//       // En cas d'erreur on utilise la fonction "reject"
//       // Quoi que l'on passe dans cette méthode, sera l'erreur dispo dans la methode "catch()"
//       if (err) reject('I couldn\'t find that file ! 😢')

//       // Ce "data" sera la valeur que la promesse nous retournera
//       // quelque soit la variable passée à la fonction "resolve",
//       // c'est ce qui sera disponible comme argument dans la méthode ".then()"
//       resolve(data);
//     })
//   })
// }

// // Idem. On passe juste les données à écrire en plus
// const writeFilePromise = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, err => {
//       if (err) reject('Could not write file ! 😢')
//       resolve('success');
//     });
//   });
// };


// // Afin d'enchaîner les méthodes ".then()",
// // il faut retourner une promesse avant d'appeler la suivante
// // "readFilePromise" retourne une promesse on peut donc chaîner une métgode ".then()" dessus
// readFilePromise(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`The breed is (got from the file) : « ${data} »`);
//     // Ici on "return" pour pouvoir chaîner le ".then()" suivant (retourne une promesse)
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);
//     // ce code retourne un promesse, on peut donc encore utilser un "then()" dessus
//     return writeFilePromise('dog-img.txt', res.body.message)
//   })
//   .then(() => {
//     console.log('Random dog image saved to file !');
//   }) 
//   // malgré plusieurs chaînage de promesse, à la fin on n'a besoin que d'un seul "catch"
//   .catch(err => {
//     console.error(err);
//   });


// ******************************************************************************************
// ***********                           ASYNC / AWAIT                            ***********
// ******************************************************************************************

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I couldn\'t find that file ! 😢')
      resolve(data);
    })
  })
}

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file ! 😢')
      resolve('success');
    });
  });
};

// On indique qu'elle est asynchrone
// elle retourne automatiquement une promesse
// dans une fonction "async" on peut avoir une ou plusieurs "await"
// const getDogPic = async () => {
//   // NOTE : on ne pourra pas attacher de "catch" pour la gestion d'erreur si on ne fait pas un "try" d'abord
//   try {
//     // On met le resultat dans une variable
//     // le "await" stop le code ici jusqu'à ce que la promesse soit résolue
//     // Si elle est "fulfilled" (succès), la valeur de l'expression await est celle de la promesse résolue
//     // cela correspond à « readFilePromise(`${__dirname}/dog.txt`).then(data => { console.log... »
//     const data = await readFilePromise(`${__dirname}/dog.txt`);
//     console.log(`The breed is (got from the file) : « ${data} »`);
  
//     // idem
//     const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     console.log(res.body.message);
  
//     // idem
//     // Pas besoin de variable, car on a pas de valeur significative à resoudre
//     await writeFilePromise('dog-img.txt', res.body.message);
//     console.log('Random dog image saved to file !');
//   }
//   catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                      *******************
//                                      *** 1er exemple ***
//                                      *******************
// const getDogPic = async () => {
//   try {
//     const data = await readFilePromise(`${__dirname}/dog.txt`);
//     console.log(`The breed is (got from the file) : « ${data} »`);
  
//     const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     console.log(res.body.message);
  
//     await writeFilePromise('dog-img.txt', res.body.message);
//     console.log('Random dog image saved to file !');
//   }
//   catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// console.log('1: Will get 🐶 pics !');             // affiché en 1er
// getDogPic();                                      // affiché en dernier : demarre mais comme en asynchrone, continue le code avant afficher les logs contenus dans la fonction
// console.log('2: Done getting dog pics 👀 !');    // affiché donc en 2eme

// ***********************
// ** Donne ce resultat **
// ***********************
// 1: Will get 🐶 pics !
// 2: Done getting dog pics 👀 !
// The breed is (got from the file) : « labrador »
// https://images.dog.ceo/breeds/labrador/n02099712_1660.jpg
// Random dog image saved to file !
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                      ********************
//                                      *** 2eme exemple ***
//                                      ********************
// const getDogPic = async () => {
//   try {
//     const data = await readFilePromise(`${__dirname}/dog.txt`);
//     console.log(`The breed is (got from the file) : « ${data} »`);
  
//     const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     console.log(res.body.message);
  
//     await writeFilePromise('dog-img.txt', res.body.message);
//     console.log('Random dog image saved to file !');
//   }
//   catch (err) {
//     console.error(err);
//     throw err;
//   }
//   return '2: READY 🐕'
// };

// console.log('1: Will get 🐶 pics !');             // affiché en 1er
// const x = getDogPic();                            // affiché en dernier : demarre mais comme en asynchrone, continue le code avant afficher les logs contenus dans la fonction
// console.log('x => ', x);                          // affiché en 2eme = PROMISE PENDING : JS ne sait pas encore que c'est "2: READY 🐕" qu'il doit afficher car la fonction n'est pas encore finie
// console.log('3: Done getting dog pics 👀 !');    // affiché en 3eme    

// ***********************
// ** Donne ce resultat **
// ***********************
// 1: Will get 🐶 pics !
// x =>  Promise { <pending> }        // Donc si on veut afficher le "2: READY 🐕", il faut le traiter comme une promsesse avec ".then" ou avec "async/await"
// 3: Done getting dog pics 👀 !
// The breed is (got from the file) : « labrador »
// https://images.dog.ceo/breeds/labrador/n02099712_5965.jpg
// Random dog image saved to file !
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                      ********************
//                                      *** 3eme exemple ***
//                                      ********************
// const getDogPic = async () => {
//   try {
//     const data = await readFilePromise(`${__dirname}/dog.txt`);
//     console.log(`The breed is (got from the file) : « ${data} »`);
  
//     const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     console.log(res.body.message);
  
//     await writeFilePromise('dog-img.txt', res.body.message);
//     console.log('Random dog image saved to file !');
//   }
//   catch (err) {
//     console.error(err);
//   }
//   return '2: READY 🐕'
// };

// *****************************
// ** Solution avec ".then()" **
// *****************************
// console.log('1: Will get 🐶 pics !');               // affiché en 1er
// getDogPic()                                         // affiché en 2eme (les 3 console.log de la fonction)
//   .then((x) => {
//     console.log(x);                                 // affiché en 3eme (le "2: READY 🐕")
//     console.log('3: Done getting dog pics 👀 !');  // affiché en 4eme
//   })
//   .catch((err) => {                                 // même en rajoutant un catch ici, si erreur, le code continue
//     console.log('Error ! 💩');
//   });

// ***********************
// ** Donne ce resultat **
// ***********************
// 1: Will get 🐶 pics !
// The breed is (got from the file) : « labrador »
// https://images.dog.ceo/breeds/labrador/n02099712_2332.jpg
// Random dog image saved to file !
// 2: READY 🐕
// 3: Done getting dog pics 👀 !

// ***********************
// ** Donne ce resultat **
// ***    SI ERREUR    ***
// ***********************
// 1: Will get 🐶 pics !
// I couldn't find that file ! 😢     // erreur est bien signalé ici, mais le code continue -- même en ayant rajouté un catch
// 2: READY 🐕
// 3: Done getting dog pics 👀 !
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                      ********************
//                                      *** 3eme exemple ***
//                                      ********************
//                                      * gestion d'erreur *
//                                      ********************

// const getDogPic = async () => {
//   try {
//     const data = await readFilePromise(`${__dirname}/doggg.txt`);
//     console.log(`The breed is (got from the file) : « ${data} »`);
  
//     const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     console.log(res.body.message);
  
//     await writeFilePromise('dog-img.txt', res.body.message);
//     console.log('Random dog image saved to file !');
//   }
//   catch (err) {
//     console.error(err);                      // On console.log l'erreur
//     throw err;                               // et ici, on rejète la promesse, pour arrêter le code/la fonction
//   }
//   return '2: READY 🐕'
// };

// *****************************
// ** Solution avec ".then()" **
// *****************************
// console.log('1: Will get 🐶 pics !');               // affiché en 1er
// getDogPic()                                         // affiché en 2eme (les 3 console.log de la fonction)
//   .then((x) => {
//     console.log(x);                                 // affiché en 3eme (le "2: READY 🐕")
//     console.log('3: Done getting dog pics 👀 !');  // affiché en 4eme
//   })
//   .catch((err) => {
//     console.log('Error ! 💩');
//   });

// ***********************
// ** Donne ce resultat **
// ***    SI ERREUR    ***
// ***********************
// 1: Will get 🐶 pics !
// I couldn't find that file ! 😢       // erreur est signalé 
// Error ! 💩                           // et on a bien arrêté le code
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                      ********************
//                                      *** 4eme exemple ***
//                                      ********************
//                                      * gestion d'erreur *
//                                      ********************

// const getDogPic = async () => {
//   try {
//     const data = await readFilePromise(`${__dirname}/dog.txt`);
//     console.log(`The breed is (got from the file) : « ${data} »`);
  
//     const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     console.log(res.body.message);
  
//     await writeFilePromise('dog-img.txt', res.body.message);
//     console.log('Random dog image saved to file !');
//   }
//   catch (err) {
//     console.error(err);
//     throw err;                               // Ici, on stop la promesse en cas d'erreur, pour arrêter la fonction
//   }
//   return '2: READY 🐕'
// };

// // *****************************
// // * Solution avec asyn/await  *
// // *****************************
// // *****************************************************
// // *** IIFE = Immediately Invoked Functon Expression ***
// // *****************************************************
// On définit notre fonction avec des parenthèses
// (On la déclare "async" pour utiliser "await")
// (async () => {
//   try {
//     console.log('1: Will get 🐶 pics !');
//     // On délare une variable et on await la promesse (getDogPic)
//     const x = await getDogPic();
//     console.log(x);
//     console.log('3: Done getting dog pics 👀 !');
//     // Même si on n'utilise pas "err" on est obligé de le mettre ici
//   } catch (err) {
//     console.log('Error ! 💩');
//   }
// // et on l'appelle aussitôt (avec des parenthèses)
// })();

// ***********************
// ** Donne ce resultat **
// ***********************
// 1: Will get 🐶 pics !
// The breed is (got from the file) : « labrador »
// https://images.dog.ceo/breeds/labrador/n02099712_6664.jpg
// Random dog image saved to file !
// 2: READY 🐕
// 3: Done getting dog pics 👀 !

// ***********************
// ** Donne ce resultat **
// ***    SI ERREUR    ***
// ***********************
// 1: Will get 🐶 pics !
// I couldn't find that file ! 😢       // erreur est signalé 
// Error ! 💩                           // et on a bien arrêté le code
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ******************************************************************************************
// ***********                   MULTI PROMISES SIMULTANEOUSLY                    ***********
// ******************************************************************************************

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`The breed is (got from the file) : « ${data} »`);
  
    // Comment chercher 3 images de l'API ?
    // si on await les appels API les uns après les autres
    // (le deuxième doit attendre le premier, le troisème attendre le 2eme ....)
    // ce n'est pas une bonne solution. Le mieux est de les lancer les promesses en simultané
    // Donc on ne fait pas de 'await' ici, mais on sauvegarde la promesse dans une variable
    // AVANT : const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    // DEVIENT : const res1Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    // C'est la promesse, pas la valeur de la promesse résolue dans "res1Promise"
    const res1Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    // Maintenant pour avoir les valeurs resolues (les 3 images), on crée une variable
    // et on les await avec "promise.all" et un tableau qui contient les promesses
    // cela va lancer les promesses en même temps et sauvegarder leurs valeurs une fois résolues
    const all = await Promise.all([res1Promise, res2Promise, res3Promise]);
    // console.log('all => ', all); // tableau énorme (http méthod, request, event etc....)
    // avec ".map()" on crée un tableau avec juste le "res.body.message"
    const images = all.map(el => el.body.message);
    console.log('images => ', images);

    // avec ".join()" on transforme le tableau en chaîne de caractère, 
    // et on sépare avec une nouvelle ligne ("\n")
    await writeFilePromise('dog-img.txt', images.join("\n"));
    console.log('Random dogs image saved to file !');
  }
  catch (err) {
    console.error(err);
    throw err;
  }
  return '2: READY 🐕'
};

(async () => {
  try {
    console.log('1: Will get 🐶 pics !');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics 👀 !');
  } catch (err) {
    console.log('Error ! 💩');
  }
})();