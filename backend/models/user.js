const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true 
    },
    password: {
        type: String, 
        required: true
    },
    avatar: {
        type: String, 
        
    },
    date: {
        type: Date,
        default: Date.now 
    },
}, {timestamps: true});
UserSchema.statics.signup = async function({username, email,avatar, password})
{
    
    if(!username || !email || !password)
    {
        throw Error('Fill in all fields');
    }
    const usernameExists = await this.findOne({username});
    const emailExists = await this.findOne({email});
    if(usernameExists)
    {
        throw Error('Username already taken');
    }
    if(emailExists)
    {
        throw Error('Email already taken');
    }
    if(!validator.isEmail(email))
    {
        throw Error('Enter a valid email address');
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error('Weak password');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({username, email, password: hash});
    return user;
}
UserSchema.statics.login = async function(email, password)
{
    if(!email || !password)
    {
        throw Error('Enter email and password');
    }
    const correctEmail = await this.findOne({email});
    if(!correctEmail)
    {
        throw Error('Email cannot be found');
    }
    const isPassMatch = await bcrypt.compare(password, correctEmail.password);
    if(!isPassMatch)
    {
        throw Error('Password is not correct');
    }
    return correctEmail;

}
module.exports = User = mongoose.model('User', UserSchema);