var fs = require("fs");
var test = require("tape");
var supertest = require("supertest")
var router = require("../src/router.js");


// Test de l'index
test("Test index.html", function(assert) {

  supertest(router)
    .get("/")
    .expect(200)
    .end(function(error, response) {
      assert.ok(response.text.includes("<title>My first Node.js blog!</title>"), "Root renders index.html");
      assert.end();
    });

});


// Test de n'importe quelle page trouvée
test("Static asset found", function(assert) {

  supertest(router)
    .get("/main.css")
    .expect(200)
    .end(function(error, response) {
      assert.ok(response.text.includes("body {"), "Returns main.css");
      assert.end();
    });

});


// Test de n'importe quelle page non trouvée
test("Static asset found", function(assert) {

  supertest(router)
    .get("/no_file")
    .end(function(error, response) {
      assert.ok(response.statusCode, 404, "Returns error 404");
      assert.end();
    });

});


// Test create post
test("Test Create post", function(assert) {

  supertest(router)
    .post("/blogpost/create")
    .send("blogpost=test_blogpost")
    .end(function(error, response) {
      assert.equal(response.statusCode, 302, "Post creation redirect");
      assert.equal(response.header.location, "/", "Redirects to /");
      fs.readFile(__dirname + "/../src/posts.json", function(err, file) {
        var blogposts = JSON.parse(file);
        for (var i in blogposts) {}
        assert.equal(blogposts[i], "test_blogpost", "Write a new post in posts.json");
        assert.end();
      });

    });

});