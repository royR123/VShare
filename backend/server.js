const express = require('express')
require('dotenv').config();
const db_connect = require('./config/db')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
db_connect();

app.use(cors({
    origin : ['http://localhost:3000'],
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/user',require('./routes/users'));
app.use('/video',require('./routes/videos')); 



app.listen(PORT,() => {
    console.log(`server is listening at port ${PORT}`)
})