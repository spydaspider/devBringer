const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const secret = require('../config/keys.js').SECRET;
const auth = async(req, res, next)=>{
    const authorization = req.headers;
    if(!authorization)
    {
        res.status(400).json({error: 'No token, authorization failed'});
    }
    const token = authorization.split(' ')[1];
    try{
        const { _id} = jwt.verify(token, secret);
        req.user = await User.findOne({_id}).select('_id');
        next();

    }
    catch(error){
        res.status(400).json({error: 'Invalid token, authorization failed'})
    }

}
module.exports = auth;