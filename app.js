//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Write something by clicking on the compose button.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// connecting mongoose

mongoose.connect("mongodb+srv://akashgov:akashgov1999@cluster0.cfxbo4t.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

// creating schema for db

const postSchema = new mongoose.Schema({
  name:String,
  title: String,
  content: String
});

// creating model for database

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){

  Post.find({}, function(err, posts){

    res.render("home", {
 
      startingContent: homeStartingContent,
 
      posts: posts
 
      });
 
  })
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

// creating docs for db
  const post = new Post({
    name: req.body.writerName,
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });

});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      name: post.name,
      title: post.title,
      content: post.content
    });
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server has started Successfully!");
});
