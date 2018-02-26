var fs = require("fs");


function indexHandler(request, response) {

  fs.readFile(__dirname + "/../public/index.html", function(error, file) { // alors lire le fichier index.html

    if (error) {
      response.writeHead(404); // file not found
    } else {
      response.writeHead(200, { // requête réussie
        "Content-type": "text/html"
      });
      response.write(file); // on sert le fichier /public/index.html
    }
    response.end();
  });

}

function assetsHandler(request, response) {

  fs.readFile(__dirname + "/../public/" + request.url, function(error, file) {
    if (error) {
      response.writeHead(404);
    } else {
      response.write(file);
    }
    response.end();

  });
}


module.exports = {
  index: indexHandler,
  assets: assetsHandler
}