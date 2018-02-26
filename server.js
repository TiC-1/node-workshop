var http = require("http"); // Charge le module 'http'

var router = require("./src/router.js"); // Fait le lien avec la fonction handler dans

var server = http.createServer(router);

server.listen(3002, function() {
  console.log("listening port 3002");
});