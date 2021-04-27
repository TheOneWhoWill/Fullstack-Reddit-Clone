import express from 'express';
import Users from '../models/user.js';
const router = express.Router()

// Getting all for a User
router.get('/', async (req, res) => {

  var id = req.params.user;

  Users.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    })

})

// Getting all for a User
router.get('/:user', async (req, res) => {

  var id = req.params.user;

  Users.find({uid: id})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    })

})

// Join a Cummunity
router.post('/join/:id', (req, res) => {

  const id = req.params.id;
  const cummunity = req.body.cummunity;

  Users.findOne({uid: id}, (err, result) => {
    result.joined.push(cummunity)
    result.save()
  })

})


export default router;