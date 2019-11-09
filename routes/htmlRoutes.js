var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/forum", function(req, res) {
    res.render("index");
  });

  app.get("/movies", function(req, res) {
    res.render("movies");
  });
  app.get("/shopping", function(req, res) {
    res.render("shopping");
  });
  app.get("/soundtracks", function(req, res) {
    res.render("soundtracks");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
