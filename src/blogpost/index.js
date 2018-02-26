var fs = require("fs");


function index(request, response) {
  fs.readFile(__dirname + "/../posts.json", function(error, file) {
    if (error) {
      console.error(error);
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

module.exports = index;
