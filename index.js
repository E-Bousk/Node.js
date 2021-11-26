// ******************************************************************************************
// ***************                      CALLBACK  HELL                        ***************
// ******************************************************************************************
// ** On a une callback fonction dans une callback fonction dans une callback fonction ... **
// ******************************************************************************************

// On require le module "filesystem" pour lire notre fichier
const fs = require('fs');

// On require "superagent"
const superagent = require('superagent');

// [On lit le fichier texte] de manière asynchrone
// On passe le chemin du fichier et une callback function
// qui sera appelée dès qu'on aura fini de lire le fichier
fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
  console.log(`The breed is (got from the file) : « ${data} »`);

  // [On fait une requete HTTP "get" sur une API pour récupérer une image]
  // On doit aussi utiliser la méthode "end ()" dans laquelle on met une fonction callback
  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
    // en cas d'erreur, on n'écrit rien dans le fichier, car on est sorti grâce au "return"
    if (err) return console.error(err.message);
    // (NOTE : la réponse attendue est dans "body" et on veux juste la valeur de "message")
    console.log(res.body.message);

    // [On sauvegarde l'URL dans un fichier texte]
    // (‼ On va donc devoir faire une troisième fonction callback imbriquée ‼)
    // On passe le nom du fichier à créer et le texte à y insérer
    // puis une callback function (qui aura juste une ERReur)
    fs.writeFile('dog-img.txt', res.body.message, (err) => {
      // en cas d'erreur, on n'écrit rien dans le fichier, car on est sorti grâce au "return"
      if (err) return console.error(err.message);
      console.log('Random dog image saved to file !');
    });
  });
});
