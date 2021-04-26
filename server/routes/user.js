import express from 'express';
import Users from '../models/user.js';
const router = express.Router()

// Getting all for a User
router.get('/from/:id', async (req, res) => {
  var id = req.params.id;
  Users.find({parentPost: id})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    })
})

// Inserting One
router.post('/create', (req, res) => {
  const userSubRequest = {
    SubredditName: req.body.SubredditName,
    SubredditHandle: req.body.SubredditHandle,
    description: req.body.description,
    SubredditPicture: req.body.SubredditPicture,
    members: 0,
    mod: req.body.mod
  }
  Users.create(userSubRequest)
})

export default router