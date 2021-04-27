import express from 'express';
import Users from '../models/user.js';
const router = express.Router()

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

export default router;