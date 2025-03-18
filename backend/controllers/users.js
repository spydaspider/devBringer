const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
/* const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
} */
const signup = async(req,res)=>{
    const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
    try{
         const user = await User.signup({username: req.body.username, email: req.body.email, avatar, password: req.body.password});
         res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({error: error.message});

    }
}
module.exports = { signup };