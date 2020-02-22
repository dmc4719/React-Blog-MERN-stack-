const express = require('express')
const app = express()
const router = express.Router()
const {create_Post,deletePost,viewPosts,updatePost,viewSinglePost} = require('./../controllers/postsController')
const authenticate = require('./../authenticate')
const auth = require('./../middleware/auth')
const Post = require('./../models/Posts')
const multer = require('multer')
const path = require("path")
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')

const DIR = './public/posts_Images';
      

router.get('/',viewPosts);
router.post('/create_post',authenticate,create_Post)
router.delete('/delete_Post',authenticate,deletePost)
router.get('/:id',viewSinglePost)
router.delete('/update_Post/:id',authenticate,updatePost)

 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(!file){res.json({error: "no file selected"})}
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        if(!file){res.json({error: "no file selected"})}
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(!file){res.json({error: "no file selected"})}
        
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



router.post('/upload_post_image', upload.single('postImage'), (req, res, next) => {
    
    if(req.file==undefined){
        console.log('no file found')
       return res.status(400).json({error: "no file selected"})
    }
  console.log(req.user)
        const url = req.protocol + '://' + req.get('host')
        data= url + '/public/posts_Images/' + req.file.filename
        try {
            res.status(201).json({postImage: data})
        } catch (error) {
            res.status(500).json({error});
        }
        next()
        
    })
    






module.exports = router