const express = require('express')
require('dotenv').config();
const db_connect = require('./config/db')
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
db_connect();

app.use(express.json());
app.use(cookieParser());

app.use('/user',require('./routes/users'));

app.use('/',(req,res)=>{
    console.log(req.body);
    res.cookie("rollno",1);
    res.send("server is running")
})

app.listen(PORT,() => {
    console.log(`server is listening at port ${PORT}`)
})