const mongoose = require('mongoose');

const connect = async ()=>{
    const con = await mongoose.connect(process.env.DB_CONNECT)
    con ? console.log("DB is Conneted") : console.log("DB Conneted Problam ")
}
connect()
