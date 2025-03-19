const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth.js');
const router = express.Router();
//load user model
const User = require('../models/user.js');
//load profile model
const Profile = require('../models/profile.js');
const { getUserProfile } = require('../controllers/profile.js');

//Get current users profile
router.get('/',auth, getUserProfile);
module.exports = router;