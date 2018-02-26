var http = require("http");
var fs = require("fs");
var querystring = require("querystring");

function handler(request, response) {
  console.log(request.url);
  var endpoint = request.url;
  if (endpoint === "/") {
    fs.readFile(__dirname + "/public/index.html", function(error, file) {

      if (error) {
        console.error(error);
        response.writeHead(404);
      } else {
        response.writeHead(200, {
          "Content-type": "text/html"
        });
        response.write(file);
      }
      response.end();
    });

  } else if (endpoint === "/blogpost/create") {
    var data = "";
    request.on("data", function(dataBlock) {
      data += dataBlock;
    });
    request.on("end", function() {
      var parsedData = querystring.parse(data);
      response.writeHead(200, {
        "Content-type": "application/json"
      });
      response.end(JSON.stringify(parsedData));
    });

  } else if (endpoint === "/blogposts") {
        fs.readFile(__dirname + "/src/posts.json", function(error, file){
    if (error) {
      console.error(error);
      response.writeHead(404);
    } else {
      response.writeHead(200, {"Content-type": "application/json"});
            response.write(file);
        }
        response.end();
      });
    
  } else {
    fs.readFile(__dirname + "/public/" + endpoint, function(error, file) {
      if (error) {
        console.error(error);
        response.writeHead(404);
      } else {
        response.write(file);
      }
      response.end();
    });

    // response.writeHead(404);
    // response.end();
  }
  // response.writeHead(200, {"Content-type": "text/html"});
  // response.write("ciao ciao");
  // response.end(CIAO);
}

var server = http.createServer(handler);

server.listen(3002, function() {
  console.log("listenig port 3002");
});
