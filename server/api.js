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

  User.findById(req.user._id).then(user => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.post("/questions", (req, res) =>{
  const newQuestion = new Question({
  creatorName: req.body.creatorName,  
  creatorId: req.body.creatorId,
  time: req.body.time,
  content: req.body.content,
  likes: req.body.likes,
  postTags: req.body.postTags,
  creatorBio: req.body.creatorBio,
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

router.post("/comments",(req,res)=> {
  const newComment = new Comment({
    creatorName: req.user.name,
    creatorId: req.body.creatorId,
    time: req.body.time,
    content: req.body.content,
    parentId: req.body.parentId,
    likes: req.body.likes
  })
  newComment.save()
  .then((comment)=>{
  res.send(comment)
  Question.findById(comment.parentId)
  .then((questionFound)=> {
  if (req.user._id !== questionFound.creatorId){
  User.findById(questionFound.creatorId).then((userFound)=>{ 
    let newNotification;
    newNotification = {
      senderName: comment.creatorName,
      commentContent: comment.content,
      commentTime: comment.time,
      questionAnswered: questionFound.content,
      isRead: false, 
    }
  userFound.notifications.push(newNotification);
  userFound.save();
  //mayyybbeeee
  socket.getSocketFromUserID(questionFound.creatorId).emit("notification", newNotification);
      
      }
  
  )}})
  
  })

})
router.get("/comments", (req,res)=> {
  // console.log("Parent ID ", req.query.parentId)
  Comment.find({parentId:req.query.parentId})
  .then((comments)=>{
  // console.log("comments queried: ", comments)
  res.send(comments)})
})
router.get("/userquestions", (req,res)=> {
  Question.find({creatorId: req.query.creatorId})
  .then((questions)=>{
  res.send(questions)})

})
router.get("/user",(req,res)=>  
  {
    // console.log(req.query) 
  User.find({_id:req.query.userId}).then((user)=>res.send(user) )})


router.post("/addsubscription", (req, res) => {
  let tag = req.query.tag;

  User.findById(req.user._id).then((user)=> {
    let check = user.subscribedTags.includes(tag);
    if (!check) {
      user.subscribedTags = [...user.subscribedTags].concat(tag);
      req.user.subscribedTags = user.subscribedTags;
    }
    // remove from unsubscribed
    // const index = user.unsubscribedTags.indexOf(tag);
    // if (index > -1) {
    //   user.unsubscribedTags = [...user.unsubscribedTags].splice(index, 1);
    // }
    
    user.save().then(user => res.send(user));
  })
});

router.post("/removesubscription", (req, res) => {
  let tag = req.query.tag;

  User.findById(req.user._id).then((user)=> {
    let check = user.subscribedTags.includes(tag);
    if (check) {
      let index = user.subscribedTags.indexOf(tag)
      user.subscribedTags = [...user.subscribedTags].splice(index, 1);
      req.user.subscribedTags = user.subscribedTags;
    }
    // remove from unsubscribed
    // const index = user.unsubscribedTags.indexOf(tag);
    // if (index > -1) {
    //   user.unsubscribedTags = [...user.unsubscribedTags].splice(index, 1);
    // }
    
    user.save().then(user => res.send(user));
  })
});
router.put("/usertags",(req, res)=>{
  User.findById(req.user._id).then((user)=>{
    user.subscribedTags = req.body.subscribedTags
    user.save().then((user)=>res.send(user))
    req.user.subscribedTags = user.subscribedTags;
  } 
)
})

router.put("/questionlikes",(req,res)=>{
  User.findById(req.user._id).then((user)=>{
  if (user.likedPosts.includes(req.body._id)){
    Question.findOne({_id:req.body._id}).then((questionFound)=>{
      questionFound.likes--
      user.likedPosts.splice(user.likedPosts.indexOf(req.body._id),1)
      user.save()
      req.user.likedPosts = user.likedPosts
      questionFound.save()
      res.send(questionFound)
    })
  }else{
    Question.findOne({_id:req.body._id}).then((questionFound)=>{
      questionFound.likes++
      user.likedPosts.push(req.body._id)
      user.save()
      req.user.likedPosts = user.likedPosts
      questionFound.save()
      res.send(questionFound)
    })
  
  }


  })


})
router.put("/commentlikes",(req,res)=>{
  User.findById(req.user._id).then((user)=>{
  if (user.likedComments.includes(req.body._id)){
    Comment.findOne({_id:req.body._id}).then((commentFound)=>{
      commentFound.likes--
      user.likedComments.splice(user.likedComments.indexOf(req.body._id),1)
      user.save()
      req.user.likedComments = user.likedComments
      commentFound.save()
      res.send(commentFound)
    })
  }else{
    Comment.findOne({_id:req.body._id}).then((commentFound)=>{
      commentFound.likes++
      user.likedComments.push(req.body._id)
      user.save()
      req.user.likedComments = user.likedComments
      commentFound.save()
      res.send(commentFound)
    })
  
  }


  })


})
// router.put("/questionlikes",(req,res)=>{
//   Question.findById(req.body._id).then((questionFound)=>{
//     if(req.body.add){questionFound.likes++}
//     else{questionFound.likes--}
//     questionFound.save()
//     res.send(questionFound)
//   })
// })
router.put("/editbio",(req,res)=>{
  User.findById(req.user._id).then((user)=>{
    user.bio = req.body.newBio
    user.save().then((user)=>res.send(user))
    req.user.bio = user.bio;
  })

})
router.post("/makenotificationsread",(req,res)=>{
    User.findById(req.user._id).then((user)=>{
    user.notifications = req.body.updatedNotifications
    user.save().then(()=>res.send({}))
    req.user.notifcations = user.notifications
  
  })

})
router.get("/usernameandbio", (req,res)=>{
  User.findOne({_id: req.query.userId}).then((user)=>{
    let newObj = {userName:user.name, userBio:user.bio}
    res.send(newObj)
  }
  )
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
