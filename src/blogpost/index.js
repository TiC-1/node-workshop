var fs = require("fs");

function readFile(request, response) {

  fs.readFile(__dirname + "/../posts.json", function(error, file) {
    if (error) {
      response.writeHead(404);
    } else {
      response.writeHead(200, {
        "Content-type": "application/json"
      });
      response.write(file);
    }
    response.end();
  });

}

module.exports = readFile;