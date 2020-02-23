const express = require('express'),
      router = express.Router(),  
      {Login, Register, getUsers} = require('./../controllers/authController')
      multer = require('multer'),
      DIR = './public/uploads';
 
router.post('/login',Login)
router.post('/register',Register)
router.get('/users',getUsers)



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


router.post('/upload_user_image', up.single('userImage'), (req, res, next) => {
    
    if(req.file==undefined){
        console.log('no file found')
       return res.status(400).json({error: "no file selected"})
    }
  console.log(req.user)


        const url = req.protocol + '://' + req.get('host')
        data= url + '/public/uploads/' + req.file.filename
        try {
            res.status(201).json({userImage: data})
        } catch (error) {
            res.status(500).json({error});
        }
        next()
        
    })



module.exports = router