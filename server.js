const express = require('express'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      db = require('./config/keys').mongoURI,
      app = express(),
      port = process.env.port || 5000,
      auth = require('./routes/auth'),
      admin = require('./routes/admin'),
      posts = require('./routes/posts'),
      comments = require('./routes/comments'),
      multer = require('multer'),
      passport = require('passport'),
      socketio = require('socket.io'),
      http = require('http'),
      server = http.createServer(app);
      global.io = module.exports.io =  socketio(server),
      fileUpload = require('express-fileupload')
      Post = require('./models/Posts')
      app.use(express.json())
      app.use( express.urlencoded({ extended: false }) )
      
     
      
      app.use('/public', express.static('public'));
      

      
      app.use(cors())
      app.use('/public', express.static('public'));
    const checkUserType = function(req,res,next){
        const userType = req.originalUrl.split('/')[2]
        
        require('./passport')(userType,passport)
        next();
    }
    
      app.use(checkUserType)
      app.use(passport.initialize())
      app.use('/api/auth/',auth)
      app.use('/api/admin/',admin)    
      app.use('/api/auth/posts',posts)
      app.use('/api/auth/comments',comments)

      io.on('connection',function(socket){
        console.log('a user connected')
        
        socket.on('disconnect',()=>{
            console.log('user has left')
        })
    })

  


 



      mongoose.set('useCreateIndex', true);
      mongoose.set('useFindAndModify',false);
      mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true  })
              .then(console.log('Connected to MongoDB')) 
              .catch(err => console.log(err))
      
      server.listen(port,() => {
          console.log(`server started on port ${port}`)
      })


      







     