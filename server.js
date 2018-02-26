var http = require("http");
var router = require("./src/router");
var server = http.createServer(router);

server.listen(3002, function() {
  console.log("listenig port 3002");
});
