var test = require("tape");
var router = require("../src/router");
var supertest = require("supertest");
var fs = require("fs");
//
// test("Router test", function (assert){
// supertest(router)
// .get("/")
// .expect(200)
// .end(function(error, response){
//
//   assert.ok(response.text.includes("Node Girls"),
//    "root renders index.html");
//     assert.end();
//
// });
//
// });
//
// test("Test static assets", function (assert){
// supertest(router)
// .get("/main.css")
// .expect(200)
// .end(function(error, response){
//
//   assert.ok(response.text.includes("body {"),
//    "css is working fine");
//
// });
// });
//
// test("Test static assets 2", function (assert){
// supertest(router)
// .get("/nonexistent")
// .expect(200)
// .end(function(error, response){
//   assert.equal(
//     response.statusCode,
//     404,
//     "Returns 404");
//   });
//
//     assert.end();
//
// });
// });

test("Create post", function (assert){
supertest(router)
.post("/blogpost/create")
.send("blogpost=test blogpost")
.end(function(error, response){

  assert.equal(
    response.statusCode,
    302,
    "post redirected"
  );

  assert.equal(
    response.header.location,
    "/",
    "redirected to /"  );


    fs.readFile(__dirname+"/../src/posts.json", function(err, file){
      var blogposts= JSON.parse(file);
    for(var blogpost in blogposts){
    }
      assert.equal(
        blogposts[blogpost],
        "test blogpost",
        "create a new "
      )

    assert.end();
    });


});
});
