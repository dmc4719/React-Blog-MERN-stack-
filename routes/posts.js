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

const DIR = './public/uploads';
      

router.get('/',viewPosts);
router.post('/create_post',auth,create_Post)
router.delete('/delete_Post',auth,deletePost)
router.get('/:id',viewSinglePost)
router.put('/update_Post/',auth,updatePost)


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});


const upload = multer({ storage: storage }).single("file");

//For Quill Editor Upload files
router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        console.log(res.req.file.path,res.req.file.filename)
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});


//upload function for Cover Image Upload/Update
var up = multer({
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


    router.post('/upload_post_image', up.single('postImage'), (req, res, next) => {
    
        if(req.file==undefined){
            console.log('no file found')
           return res.status(400).json({error: "no file selected"})
        }
      console.log(req.user)


            const url = req.protocol + '://' + req.get('host')
            data= 'public/uploads/' + req.file.filename
            console.log(data)
            try {
                res.status(201).json({postImage: data})
            } catch (error) {
                res.status(500).json({error});
            }
            next()
            
        })








        
       



       



module.exports = router