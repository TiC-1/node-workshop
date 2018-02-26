var fs = require("fs");
var querystring = require("querystring");

function create(request, response) {

  var data = "";
  request.on("data", function(dataBlock) {
    data += dataBlock; // on ajoute le contenu du formulaire à une variable data (dataBlock étant le contenu du formulaire mais transmis par paquets
  });
  request.on("end", function() {
    var parsedData = querystring.parse(data); // on transforme en string l'objet JSON créé à partir de 'data'
    fs.readFile(__dirname + "/../posts.json", function(error, file) { // on lit lr fichier où sont stoké les blogposts
      if (error) { // si pas de fichier alors '404 file not found'
        console.error(error);
        response.writeHead(404);
      } else {
        var blogposts = JSON.parse(file); // sinon, on ajoute une propriété 'timestamp' à l'objet, avec un contenu qui est 'parsedData'
        blogposts[Date.now()] = parsedData.blogpost;
      }
      // et on écrit ce nouvel obket dans le fichier posts.json
      fs.writeFile(__dirname + "/../posts.json", JSON.stringify(blogposts), function(error) {
        if (error) {
          console.error(error);
          response.writeHead(404);
        }
        response.writeHead(302, { // et on fait une redirection temporaire (302) vers /, c'est à dire l'index (voir début de la fonction 'handler'), ce qu'in n'est qu'une façon de recharger l'index.
          "Location": "/"
        });
        response.end();
      });
    });
  });

}

module.exports = {
  createPost: create
}