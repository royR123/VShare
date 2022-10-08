const mongoose = require('mongoose')

const db_connect = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`db is connected`)
    }catch(e){
        console.log(e)
    }
}

module.exports = db_connect;