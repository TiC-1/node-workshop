var staticHandler = require("./staticHandler.js")
var blogpostCreate = require("./blogpost/create.js")
var blogpostRead = require("./blogpost/index.js")

function router(request, response) {
  console.log(request.url);
  var endpoint = request.url; // endpoint est la partie de l'URL qui suit le domaine principal, ici localhost:3002

  // OPTION 1 : s'il ny a rien après le domaine principal
  if (endpoint === "/") {
    staticHandler.index(request, response);

    // OPTION 2 : sinon, si l'url est localhost:3002/blogpost/create
  } else if (endpoint === "/blogpost/create") {
    blogpostCreate.createPost(request, response);

    // OPTION 3 : sinon, si l'url = /blogspots
  } else if (endpoint === "/blogposts") {
    blogpostRead(request, response);

  } else {
    staticHandler.assets(request, response);
  }
  // response.writeHead(200, {"Content-type": "text/html"});
  // response.write("ciao ciao");
  // response.end(CIAO);
}

module.exports = router;