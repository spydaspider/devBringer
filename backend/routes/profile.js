const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth.js');
const router = express.Router();
//load user model
const User = require('../models/user.js');
//load profile model
const Profile = require('../models/profile.js');
const { getUserProfile,createAndUpdateProfile,getProfileByHandle,getProfileByUser, getAllProfiles} = require('../controllers/profile.js');

//Get current users profile
router.get('/',auth, getUserProfile);
router.post('/',auth,createAndUpdateProfile);
router.get('/handle/:handle',getProfileByHandle);
router.get('/user/:user_id', getProfileByUser);
router.get('/all', getAllProfiles);
module.exports = router;