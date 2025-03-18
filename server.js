const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.get('/', (req,res)=>{
    res.send("Welcome to my server");
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})