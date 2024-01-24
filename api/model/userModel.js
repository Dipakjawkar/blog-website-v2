const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
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
    token:{
        type: String
    }
    ,
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'blogs'
        }
    ]

}, {
    timestamps: {
        createAt: 'create-at',
        updateAt: 'update-at'
    }
})

module.exports = mongoose.model('user', userSchema)