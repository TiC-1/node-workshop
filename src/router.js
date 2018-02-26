var fs = require("fs");
var querystring = require("querystring");

function router(request, response) {
  console.log(request.url);
  var endpoint = request.url;
  if (endpoint === "/") {
    fs.readFile(__dirname + "/../public/index.html", function(error, file) {

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
      fs.readFile(__dirname + "/posts.json", function(error, file) {
        if (error) {
          console.error(error);
          response.writeHead(404);
        } else {
          var blogposts = JSON.parse(file);
          blogposts[Date.now()] = parsedData.blogpost;
        }
        fs.writeFile(__dirname + "/posts.json", JSON.stringify(blogposts), function(error) {
          if (error) {
            console.error(error);
            response.writeHead(404);
          }
        response.writeHead(302, {  "Location": "/"  });
        response.end();
      });
});
});
  } else if (endpoint === "/blogposts") {
    fs.readFile(__dirname + "/posts.json", function(error, file) {
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

  } else {
    fs.readFile(__dirname + "/../public/" + endpoint, function(error, file) {
      if (error) {
        console.error(error);
        response.writeHead(404);
      } else {
        response.write(file);
      }
      response.end();
    });


  }

}

module.exports = router;
