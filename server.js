var Hapi = require('hapi');
var routes = require('./routes');
var PORT = 8080;

var config = {};
var server = new Hapi.Server('0.0.0.0', PORT, config);

server.route(routes);

server.start();
console.log('server running on PORT:', PORT);
