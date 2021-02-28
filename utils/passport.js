const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
//FOLLOWING IN-BUILT LIBRARIES ARE USED TO EXTRACT PRIVATE AND PUBLIC KEY FROM UTILS FOLDER WHICH IS USED IN ASYMMETRIC CYRYPTOGRAPHY
const fs = require('fs');
const path = require('path');
//EXTRACT PUBLIC KEY TO DECRYPT JWT
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
//TO GENERATE TOKEN AND STORE TOKEN AND CORRESPONDING USER ID IN COLLECTION
const User = require('mongoose').model('User');
var crypto = require('crypto');
var base64url = require('base64url');
function randomStringAsBase64Url(size) {
   base64url(crypto.randomBytes(size,(err,buf)=>{
      if(err)
         throw err;
       return buf.toString('hex');    
  }));
}


// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //REGION TO LOOK FOR JWT
  secretOrKey: PUB_KEY,//SIGNATURE
  algorithms: ['RS256']//HASH ALGORITHM
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {

        console.log(jwt_payload);
        
        // We will assign the `sub` property on the JWT to the database ID of user
        User.findOne({_id: jwt_payload.user_id}, function(err, user) {
       
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        });
        
    }));
}