const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./models/User')
const Admin = require('./models/Admin')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET';

module.exports = (userType,passport) => {
   
    passport.use(new JwtStrategy  (opts, (payload,done)  => {
        
        if(userType==="auth"){

             User.findOne({_id: payload._id})
            .then(user => {
                if(!user) {
                    return done(null,false)
                }
                else {
                    console.log(user)
                    return done(null,user)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
        }
        else if(userType==="admin"){
            Admin.findOne({_id: payload._id})
            .then(admin => {
                if(!admin) {
                    return done(null,false)
                }
                else {
                    return done(null,admin)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
        }
     





    }
    
    ))
}