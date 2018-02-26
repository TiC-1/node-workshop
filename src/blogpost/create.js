var querystring = require("querystring");
var fs = require("fs");

function create(request, response) {
  var data = "";
  request.on("data", function(dataBlock) {
    data += dataBlock;
  });
  request.on("end", function() {
    var parsedData = querystring.parse(data);
    fs.readFile(__dirname + "/../posts.json", function(error, file) {
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
}
module.exports = create;
