module.exports = function(app) {
  // Get all examples
  var db = require("../models");
  app.post("/api/user", function(req, res) {
    var data = [];
    db.User.findAll({
      where: {
        email: "fake@fake.com" //req.body.email
      }
    })
      .then(function(dbExamples) {
        return (data = dbExamples);
      })
      .catch(function(err) {
        console.error(err);
      });
    // for (var i = 0; i < users.length; i++) {

    // }
    console.log(data);
    if (data.length > 0) {
      res.json("Email already exists!");
    } else {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }).then(function(dbExample) {
        res.json(dbExample);
      });
    }
  });

  app.get("/api/users", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.User.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
