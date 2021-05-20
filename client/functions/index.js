const mongoose = require('mongoose');
const Users = require('./models/user.js');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const dbURL = 'mongodb+srv://TheOneWhoWill:Cybercrafter345@main-cluster.yedkf.mongodb.net/AppllicationDB?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

exports.createProfile = functions.auth.user().onCreate((userData) => {
  let user = userData.displayName;
  let uid = userData.uid;
  let joined = [];
  let credentials = {
    uid,
    joined,
    user,
    coins: 500
  }

  Users.create(credentials)
});

exports.deleteProfile = functions.auth.user().onDelete((user) => {
  Users.find({uid: user.uid}).remove();
})

admin.initializeApp();