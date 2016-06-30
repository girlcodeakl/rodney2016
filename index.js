//set up
var express = require('express')
var app = express();
var bodyParser = require('body-parser')

//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make an empty list of ideas
var posts = [];
var idea = {};
idea.text = "Two cats who solve crimes in Dunedin";
idea.time = new Date();
idea.image = 'http://i.huffpost.com/gen/3152148/images/r-ANIMALS-FUNNY-medium.jpg'
idea.id = 1001;
posts.push(idea);

//let a client GET the list of ideas
var sendIdeasList = function (request, response) {
  response.send(posts);
}
app.get('/ideas', sendIdeasList);

//let a client POST new ideas
var saveNewIdea = function (request, response) {
  console.log(request.body.idea); //write it on the command prompt so we can see
  //delete this: -> posts.push(req.body.idea); //save it in our list
//add this:
var idea = {};
idea.text = request.body.idea;
idea.image = request.body.image;
idea.time = new Date();
idea.id = Math.round(Math.random() * 10000);
posts.push(idea); //save it in our list
  response.send("thanks for your idea. Press back to add another");
}
app.post('/ideas', saveNewIdea);

//listen for connections on port 3
app.listen(process.env.PORT || 3000);
console.log("I am listening...");










app.get('/idea', function (req, res) {
   var searchId = req.query.id;
   console.log("Searching for post " + searchId);
   var results = posts.filter(function (post) { return post.id == searchId; });
  if (results.length > 0) {
    res.send(results[0]);
  } else {
  res.send(null);
  }
});
