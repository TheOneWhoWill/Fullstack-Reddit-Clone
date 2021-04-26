import express from 'express';
import Posts from '../models/post.js';
const router = express.Router()

// Getting all
router.get('/', async (req, res) => {
  Posts.find().sort([['voteCount', 'descending']])
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})
// Find One by ID
router.get('/one/:id', (req, res) => {
  var id = req.params.id;
  Posts.findOne({_id: id})
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})
// Getting One
router.get('/:id', (req, res) => {
  var queryTerm = req.params.id;
  Posts.findOne({title: new RegExp(queryTerm, 'i')})
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})
// Find one by Sub
router.get('/sub/:id', (req, res) => {
  var id = req.params.id;
  Posts.find({subReddit: id})
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})
// Getting All From One User
router.get('/user/:id', (req, res) => {
  var userTerm = `u/${req.params.id}`
  Posts.find({user: userTerm })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})

// Inserting One
router.post('/create', (req, res) => {
  const userPostRequest = {
    user: req.body.user,
    voteCount: req.body.voteCount,
    voted: [req.body.voted],
    subReddit: req.body.subReddit,
    title: req.body.title,
    imageURL: req.body.imageURL
  }
  Posts.create(userPostRequest)
})

router.delete('/delete/:id', (req, res) => {
  const voter = req.body.voter;
  const id = req.params.id;
  var sendContent = {};

  Posts.findById({_id: id}, (error, result) => {
    if(voter !== result.user) {
      sendContent.msg = 'You can\'t delete someone else\'s Post';
      sendContent.code = 500;
      res.send(sendContent);
    } else {
      sendContent.msg = 'Currently in Test Mode but this is where the post would be deleted';
      sendContent.code = 500;
      res.send(sendContent);
    }
    result.save()
  })
})

router.post('/upvote/:id', (req, res) => {
  const id = req.params.id;
  var sendContent = {};
  Posts.findOne({_id: id}, (err, result) => {
    if(err) {
      res.error(err)
    } else {
      if(result.voted.includes(req.body.voter)) {
        sendContent.msg = 'Already Upvoted';
        sendContent.code = 500;
        res.send(sendContent);
      } else {
        result.voteCount = result.voteCount + 1;
        result.voted.push(req.body.voter);
      }
    }
    result.save()
  })
})

router.post('/downvote/:id', (req, res) => {
  const id = req.params.id;
  var sendContent = {};
  Posts.findOne({_id: id}, (err, result) => {
    if(err) {
      res.error(err);
    } else {
      if(result.voted.includes(req.body.voter)) {
        result.voteCount = result.voteCount - 1;
        result.voted = result.voted.filter(e => e !== req.body.voter);
      } else {
        result.voteCount = result.voteCount + 1;
        result.voted.push(req.body.voter);
      }
    }
    result.save()
  })
})

export default router