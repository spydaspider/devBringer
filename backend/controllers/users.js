const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const secret = require('../config/keys.js').SECRET;
const createToken = (_id) =>{
    return jwt.sign({_id},secret, {expiresIn: '3d'});
}
const signup = async(req,res)=>{
    const { email } = req.body;
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
    try{
         const user = await User.signup({username: req.body.username, email, avatar, password: req.body.password});
         const token = createToken(user.id);
         res.status(200).json({email, token});
    }
    catch(error){
        res.status(400).json({error: error.message});

    }
}
const login = async(req, res)=>{
    try{
        const { email, password } = req.body;
        
         const user = await User.login(email, password); 
         const token = createToken(user.id);
         res.status(200).json({email,token}); 
       }
    catch(error)
    {
        res.status(200).json({error: error.message});
    }
}
const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find().sort({createdAt:-1});
        console.log(users);

        res.status(200).json(users);

    }
    catch(error){
        return res.status(404).json({error: error.message});
    }
}
module.exports = { signup,login,getAllUsers };