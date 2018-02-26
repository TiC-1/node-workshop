var fs = require("fs");
var querystring = require("querystring");
var staticHandler = require("./staticHandler.js");
var create = require("./blogpost/create.js");
var index = require("./blogpost/index.js");

function router(request, response) {
  var endpoint = request.url;
  if (endpoint === "/") {
    staticHandler.index(request, response);
  } else if (endpoint === "/blogpost/create") {
    create(request, response);
  } else if (endpoint === "/blogposts") {
    index(request, response);
  } else {
    staticHandler.assets(request, response);


  }

}

module.exports = router;
