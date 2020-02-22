const mongoose = require('mongoose')
const schema = mongoose.Schema


// const User = require('./User')
const ObjectId = schema.Types.ObjectId

const postsSchema = new schema({

    user: {
       type: ObjectId,
        ref: 'User'
    },
    admin: {
        type: ObjectId,
        ref: 'Admin'
    },
    title: {
        type: String,
        required: true,
        unique:true
    },
    content: {
        type: String,
        required: true,
        unique:true
    },
    image: {
            type: String,
            required: true
    },
    comments:{
        type: ObjectId,
        ref: 'Comments'
    },
    timestamps: {
        type:Date,
        default: Date.now
    },
  



})

module.exports = Posts = mongoose.model('Posts', postsSchema)