const Comment = require('./../models/Comments')

module.exports = {


    post_comment(req,res){
        const {comment,post} = req.body;
        const {user} = req

       if(comment === ''){
           return res.status(400).json({error:"Comment field empty!"})
       }
        const con = Comment()
        con.comment = comment
        con.user = user._id
        con.post = post
        con.isReply = 0,
        con.replyTo = null,
        con.save().then(json=>res.status(200).json(json))
        .catch(error=> res.status(400).json(error))

    },
    delete_comment(req,res){

    },
    like_comment(req,res){

    },
    fetch_comments(req,res){
        postId = req.params.id;
        
        Comment.find({post: postId})
        .populate('post')
        .populate('user')
       
        .then(json => { 
            
            if(!json){
                res.status(400).json({message: "no user found!"})
            }
            io.emit('comments', json)
            // io.emit("comments",post)
            res.status(200).json(json)})
        .catch(error=> res.status(404).json(error))

    },
    edit_comment(req,res){

    }



}