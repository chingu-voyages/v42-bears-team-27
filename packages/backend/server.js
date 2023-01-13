const express = require('express');
const mongoose = require('mongoose');

const app = express();
require("dotenv").config();
mongoose.set('strictQuery', false);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(()=>{
    console.log("database connected...")
})
.catch((err)=>{
    console.log(err)
})




const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server started on port ${PORT}`));