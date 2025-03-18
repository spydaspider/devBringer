const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');
const profile = require('./routes/profile.js');

const app = express();
const mongoUri = require('./config/keys.js').MONGO_URI;
app.get('/', (req,res)=>{
    res.send("Welcome to my server");
})
//use routes
app.use('/api/users', users);
app.use('/api/posts/', posts);
app.use('/api/profile/', profile);
mongoose.connect(mongoUri).then(()=>{
    console.log('MongoDb connected');
}).catch((error)=>{
    console.error(error.message);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})