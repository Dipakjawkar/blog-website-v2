const mongoose = require('mongoose');

const connect = async ()=>{
    const con = await mongoose.connect('mongodb://localhost:27017/blog')
    con ? console.log("DB is Conneted") : console.log("DB Conneted Problam ")
}
connect()
