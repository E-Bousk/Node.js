// // On appelle le module d'événement : Classe émetteur d'événements
// const EventEmitter = require('events');

// // On crée une instance de cette classe
// const myEmitter = new EventEmitter();



// // **************
// // **** 2ème ****
// // **************
// // Observe l'événement "newSale" pour lancer la fonction callback
// // avec la méthode "on"
// myEmitter.on('newSale', () => {
//   console.log('There is a new sale!');
// });

// // idem
// myEmitter.on('newSale', () => {
//   console.log('Costumer name : Casimir');
// });

// // Ici, on récupère un argument en plus
// myEmitter.on('newSale', stock => {
//   console.log(`There are now ${stock} items left in stock`);
// });

// // **************
// // **** 1er *****
// // **************
// // On émet un événement appellé "newSale"
// // avec la méthode "emit"
// // myEmitter.emit('newSale');

// // idem
// // Ici, on passe un argument en plus
// myEmitter.emit('newSale', 9);


// ***************************************************************
// *** Un meilleure pratique est de créer une nouvelle classe  ***
// ***           qui héritera du node EventEmitter :           ***
// ***************************************************************

const EventEmitter = require('events');


// La classe "Sales" hérite de la classe "EventEmitter"
class Sales extends EventEmitter {
  constructor() {
    // On appelle "super" lorsqu'on extend une 'superclass'
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There is a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Costumer name : Casimir');
});

myEmitter.on('newSale', stock => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit('newSale', 9);


// *********************
// *** Autre exemple ***
// *********************
const http = require('http');

const server = http.createServer();

// On écoute l'événement "request" 
// (qui est automatiquement fait par le navigateur)
// et on envoie une callback fonction
server.on('request', (req, res) => {
  console.log('Request received!');
  console.log(req.url);
  res.end('Request received');
});

// On écoute le même événement
server.on('request', (req, res) => {
  console.log('Another request received 😎');
});

// On écoute l'événement "close"
server.on('close', () => {
  console.log('Server closed');
});

// On démarre le serveur
server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for request...');
});