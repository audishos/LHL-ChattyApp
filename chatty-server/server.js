// server.js

const express      = require('express');
const WebSocket    = require('ws');
const SocketServer = require('ws').Server;
const uuid         = require('uuid/v4');
const randomColor  = require('randomcolor');
const fetch        = require('node-fetch');
const querystring  = require('querystring');
const dotenv       = require('dotenv').config();

const GIPHYURL = 'https://api.giphy.com/v1/gifs/random?';
const GIPHYAPIKEY = process.env.APIKEY_GIPHY;
const GIPHYREGEX = /^\/giphy\W+(\w.*)$/i;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.broadcast = (message) => {
    wss.clients.forEach( (client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  const userCountMessage = () => {
    return (JSON.stringify({
      id: uuid(),
      type: 'incomingUserConnectionCount',
      content: wss.clients.size
    }));
  }

  const initUser = (userMessage) => {
    let newUserMessage = userMessage;
    newUserMessage.content.id = newUserMessage.id;
    newUserMessage.content.colour = randomColor({ luminosity: 'bright' });
    return newUserMessage;
  }

  wss.broadcast(userCountMessage());

  ws.on('message', (postMessage) => {
    let incomingMessage = { id: uuid(), ...JSON.parse(postMessage) };
    incomingMessage.content.id = incomingMessage.id;

    switch(incomingMessage.type) {

      case 'postMessage':
        incomingMessage.type = 'incomingMessage';
        let command = incomingMessage.content.match(GIPHYREGEX);
        if (command) {
          let queryString = querystring.stringify({
            api_key: GIPHYAPIKEY,
            tag: command[1]
          });
          let url = GIPHYURL + queryString;
          fetch(url)
          .then( (response) => {
            return response.json();
          })
          .then( (json => {
            incomingMessage.content = json.data.image_url;
            wss.broadcast(JSON.stringify(incomingMessage));
          }))
          .catch( (error) => {
            console.error('A giphy API error occurred:', error);
            incomingMessage.content = 'Failed to load giphy.';
            ws.send(JSON.stringify(incomingMessage));
          });
        } else {
          wss.broadcast(JSON.stringify(incomingMessage));
        }
        break;

      case 'postNotification':
        incomingMessage.type = 'incomingNotification';
        wss.broadcast(JSON.stringify(incomingMessage));
        break;

      case 'postNewUser':
        incomingMessage.type = 'incomingNewUser';
        incomingMessage = initUser(incomingMessage);
        ws.send(JSON.stringify(incomingMessage));
        break;

      default:
        throw new Error('Unknown event type', incomingMessage.type);
    }

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast(userCountMessage());
  });
});
