// modules from node
var http = require('http');
// var fs = require('fs');
var colors = require('colors');
// + npm install --save colors

// our modules
var handlers = require('./handlers');

function start() {
  function onRequest(request, response) {
    console.log('Odebrano zapytanie'.green);
    console.log(('Zapytanie' + request.url + ' odebrane.').green);
    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    switch (request.url) {
      case '/':
      case '/start':
        handlers.welcome(request, response);
        break;
      case '/upload':
        handlers.upload(request, response);
        break;
      case '/show':
        handlers.show(request, response);
        break;
      case '/imageError':
        handlers.imageError(request, response);
        break;
      default:
        handlers.error(request,response);
    }
    // response.write('Pierwsze koty za płoty');
    // response.end();
  }
  http.createServer(onRequest).listen(9000);
  console.log("Uruchomiono serwer!".green);
}

exports.start = start;
