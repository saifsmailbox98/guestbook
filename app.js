var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = []; //global array
app.locals.entries = entries; // makes this entries array available in all views

/* Once set, the value of app.locals properties persist throughout the life of the application,
in contrast with res.locals properties that are valid only for the lifetime of the request. */

app.use(logger("dev")); // use morgan to log every request

app.use(bodyParser.urlencoded( { extended:false} )); // bodyParser.urlencoded() returns a function,
// populates a varibale called req.body if the user is submitting a form
// (The extended option is required.)

app.get("/", function(request, response){
    response.render("index");               //views/index.ejs
});

app.get("/new-entry", function(request, response){
    response.render("new-entry");           //Renders the "new-entry" page(when GETing the URL)
});

app.post("/new-entry", function(request, response){
    if(!request.body.title || !request.body.body){
        response.status(400).send("Entries must have a title and a body.");
        return;
    }
    entries.push({
        title: request.body.title,
        content: request.body.body,
        published:new Date()
    });
    response.redirect("/");
});

app.use(function(request, response){
    response.status(404).render("404");
});

http.createServer(app).listen(8080, function(){
    console.log("Guestbook app started on port 8080.");
});









