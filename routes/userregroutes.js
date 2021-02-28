(function(){
    //const mongoose = require('mongoose'); 
   // const Users = mongoose.model('../models/User');
    const passport = require('passport');
   // const utils = require('../utils/validate');
    
    var {userhome,usersignup,userprofile/*,errors*//*,usersignin*/}=require('../handlers/userreg')
	module.exports = function(app){
             app.all('/',(req,res)=>{
                     res.setHeader('OK,file recieved')
                     res.setStatusCode('200')
             })
      
		// app.get("/logout",userHandler.logout); // For GET Request
        // app.post("/",dummyHandler.handle);// For POST
        app.get('/api/baseuser'/*,errors.isLoggedin*/,passport.authenticate('jwt', { session: false }),userhome.handlehomeApi/*,errors.signuploginerrorhandler*/)
        app.get('/baseuser',userhome.handlehomeView)

        app.get("/usersignup",usersignup.handlesignupView);
        app.get("/api/usersignup",usersignup.handlesignupApi);
    
}
})();
/*
        app.post("/usersignup",usersignup.handlesignuppostView);
        app.post("/api/usersignup",usersignup.handlesignuppostApi);
        
    */
      /* app.get("/api/signin",usersignin.handlesigninApi);
        app.get("/signin",usersignin.handlesigninView);

        app.post("/api/signin",usersignin.handlesigninpostApi);
        app.post("/signin",usersignin.handlesigninpostView);
              */
        /*app.get("/api/profile",userprofile.handleprofileApi);
        app.get("/profile",userprofile.handleprofileView);

        app.post("/api/editprofile",userprofile.handleprofilepostApi);
        app.post("/editprofile",userprofile.handleprofilepostView);
*/
        /*app.post("/api/dummy",dummyHandler.handleApi)*/
       
	//};
//LOGIN OF USER USING JWT

/*
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Validate an existing user and issue a JWT
app.post('/login', function(req, res, next){

    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
});

// Register a new user
app.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    try {
    
        newUser.save()
            .then((user) => {
                res.json({ success: true, user: user });
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

});


//USER LOGIN OVER
*/


