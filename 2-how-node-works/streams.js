// On require le 'filesystem' package
const fs = require('fs');

// Raccourci pour créer un serveur
// On utilise "createServer" directement sur l'objet "http"
const server = require('http').createServer();

server.on('request', (req, res) => {

  // ******************
  // *** Solution 1 *** (mauvaise)
  // ******************
  // // Problème : Node doit charger le fichier EN ENTIER en mémoire
  // // pour pouvoir l'envoyer
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // ******************
  // *** Solution 2 *** (Streams mais problème de « backpressure »)
  // ******************
  // // Au lieu de lire le fichier avec une variable ("data") 
  // // et de devoir stocker cette variable en mémoire,
  // // on crée un 'readable stream' : 
  // // dès qu'on recoit un morceau de donnée
  // // on l'envoie comme réponse ('writable stream') au client
  // const readable = fs.createReadStream('test-file.txt');

  // // Ne reste plus qu'à écouter l'événement "data"
  // readable.on('data', chunk => {
  //   // Dans la fonction callback, on accède aux morceaux de data ("chunk")
  //   // On peut alors l'envoyer dans la réponse qui est un 'writable stream'
  //   // --> on 'stream' le contenu du fichier au client
  //   res.write(chunk);
  // });
  // // On écoute l'événement "end" qui signifie
  // // que le fichier est complètement lu
  // readable.on('end', () => {
  //   // On signale qu'il n'y a plus de data à écrire
  //   res.end();
  // });
  // // Autre événement à écouter : "error"
  // readable.on('error', err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  // ******************
  // *** Solution 3 *** (Streams)
  // ******************
  // Le problème qui survenait avec la solution 2 s'appelle « backpressure »
  // (la réponse ne peut envoyer les données aussi rapidement qu'elle les reçoit)
  // (Les données arrivent plus vite qu'elles ne peuvent être envoyées)
  // On utilise un « pipe operator » (disponible sur tous les "readable streams")
  // On "pipe the output of a readable stream right into the input of a writable stream"
  // et cela 'fix' le problème en modulant la vitesse de ce qui entre avec ce qui sort
  const readable = fs.createReadStream('test-file.txt');

  // on utilise la méthode "pipe"
  // readableSource.pipe(writeableDest)
  readable.pipe(res);
});

// On démarre le serveur
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening ...');
});