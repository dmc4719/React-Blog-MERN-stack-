const mongoose = require('mongoose')
const schema = mongoose.Schema

const ObjectId = schema.Types.ObjectId

const commentsSchema = new schema({

    comment: {
        type: String,
        required: true
    },
    isReply:{
        type: Number,
        default: 0
    },
    replyTo: {
        type: ObjectId,
        ref: 'Comments',
        default: null
    },
    
    post: {
        type: ObjectId,
        ref: 'Posts'
    },

    user: {
        type: ObjectId,
        ref: 'User'
    },

    timestamps: {
        type:Date,
        default: Date.now
    },
  


})


module.exports = Comments = mongoose.model('Comments',commentsSchema)