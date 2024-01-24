const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
    comment:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    blog:{
        type:mongoose.Types.ObjectId,
        red:"blogs"
    }
},{
    timestamps: {
        createAt: 'create-at',
        updateAt: 'update-at'
    }
})

module.exports = mongoose.model('comment',commentModel);