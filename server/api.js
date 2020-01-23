/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const asyncHandler = require("express-async-handler");
const Question = require("./models/question");
const Comment = require("./models/comment");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.post("/questions", auth.ensureLoggedIn, (req, res) =>{
  const newQuestion = new Question({
  creatorName: req.body.creatorName,  
  creatorId: req.body.creatorId,
  time: req.body.time,
  content: req.body.content,
  likes: req.body.likes,
  postTags: req.body.postTags,
  });
  newQuestion.save().then((question)=>res.send(question));
} );


router.get("/questions",async (req, res)=>{

let queryTags = req.query.postTags.split(",");
// const allQuestions = await Promise.all(queryTags.map((element)=>Question.find({postTags:element})));
// console.log("all questions ",allQuestions);

// let finalList = []
// const allQuestions2 = allQuestions.map((list1)=>finalList.concat(list1))
// console.log("all questions nafuti ",allQuestions2);
// console.log("finalList ", finalList )
const allQuestions = await Question.find({postTags: {$in: queryTags}});
res.send(allQuestions);
});

router.post("/comments", (req,res)=> {
  const newComment = new Comment({
    creatorName: req.body.creatorName,
    creatorId: req.body.creatorId,
    time: req.body.time,
    content: req.body.content,
    parentId: req.body.parentId,
    likes: req.body.likes
  })
  newComment.save().then((comment)=>res.send(comment))
})
router.get("/comments", (req,res)=> {
  // console.log("Parent ID ", req.query.parentId)
  Comment.find({parentId:req.query.parentId})
  .then((comments)=>{
  // console.log("comments queried: ", comments)
  res.send(comments)})
})
router.get("/userquestions", (req,res)=> {
  console.log("supposed to be creator ID ",req.query.creatorId)
  Question.find({creatorId: req.query.creatorId})
  .then((questions)=>{
  console.log("question objects ", questions)
  res.send(questions)})

})
router.get("/user", (req,res)=>  
  {console.log(req.query) 
  User.find({_id:req.query.userId}).then((user)=>res.send(user) )})

router.put("/usertags",(req, res)=>{
  User.findById(req.user._id).then((user)=>{
    user.subscribedTags = req.body.subscribedTags
    user.save().then((user)=>res.send(user.subscribedTags))
  } 
)
})
router.put("/commentlikes", (req,res)=>{
  Comment.findById(req.body._id).then((commentFound)=>{
    if(req.body.add) {commentFound.likes = commentFound.likes ++}
    else {commentFound.likes = commentFound.likes ++}
    res.send(commentFound)
  })
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
