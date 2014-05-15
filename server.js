var Hapi = require('hapi');
var routes = require('./routes');

var config = {};
var server = new Hapi.Server('0.0.0.0', 8080, config);

server.route(routes);

server.start();
