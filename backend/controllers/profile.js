const User = require('../models/user.js');
const Profile = require('../models/profile.js');
const mongoose = require('mongoose');
const profileInputValidator = require('../validator/profileInputValidator.js');
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
//Create user profile
const createAndUpdateProfile = async(req,res) =>{

      const { errors, isValid } = profileInputValidator(req.body);
      if(!isValid){
         return res.status(400).json(errors);
      }
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }
    //Social Section
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    try{
        const profile = await Profile.findOne({ user: req.user.id});
        if(profile){
            //update
            try{
            const profileUpdate = await Profile.findOneAndUpdate({user: req.user.id},{$set: profileFields },{new: true});
            res.status(200).json(profileUpdate);
            }
            catch(error)
            {
                res.status(400).json({error: error.message});
            }

        }
        else{
            //Create a new profile
            
         //check handle
             const profileHandle = await Profile.findOne({handle: profileFields.handle});
             if(profileHandle)
             {
                res.status(400).json({error: 'That handle already exists'});
             } 
             else{
                try{
                const newProfile = await Profile.create(profileFields);
                res.status(200).json(newProfile);
                }
                catch(error)
                {
                    res.status(400).json({error: error.message});
                }
             }

           
        }
    }
    catch(error){
        res.status(400).json({error: error.message});
    }

      

}
//create a profile
module.exports = {
    getUserProfile, createAndUpdateProfile
}
