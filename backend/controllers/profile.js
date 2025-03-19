const User = require('../models/user.js');
const Profile = require('../models/profile.js');
const mongoose = require('mongoose');
//get the users current profile
const getUserProfile = async(req,res) =>{
    const user_id = req.user._id;
    try{
    const profile = await Profile.findOne({user_id});
    if(!profile)
    {
        res.status(404).json({error:'No profile for this user'});
    }
    res.status(200).json(profile);
    }
    catch(error)
    {
        res.status(404).json({error: error.message})
    } 
}
module.exports = {
    getUserProfile 
}
