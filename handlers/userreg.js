/*const Users=require('Users')
const orders=require('orders')
const deliveries=require('deliveries')
const Customers= require('Customers')*/

function handlehomeView(req,res){
    res.render('baseuser');
    
}
function handlehomeApi(req,res){
    res.json({
        order:"order"
    });
}
function handlesignupApi(req,res,next){
    res.json({pprtpt:req.csrfToken()});
 }
function handlesignupView(req,res,next){
    res.locals.pprtpt = req.csrfToken(); 
   res.render('form.html',{pprtpt: pprtpt});
}
var userhome={
    handlehomeView:handlehomeView,
    handlehomeApi:handlehomeApi
}
/*var userprofile={
    handleprofileApi:handleprofileApi,
    handleprofileView:handleprofileView,
    handleprofilepostView:handleprofilepostView,
    handleprofilepostApi:handleprofilepostApi
}*/
var usersignup={
    handlesignupView:handlesignupView,
    handlesignupApi:handlesignupApi}
    /*handlesignuppostView:handlesignuppostView,
    handlesignuppostApi:handlesignuppostApi
}

var errors={
    signuploginerrorhandler:signuploginerrorhandler,
    isLoggedin:isLoggedin
}
*/
/*
var usersignin={
    handlesigninApi:handlesigninApi,
    handlesigninView:handlesigninView,
    handlesigninpostView:handlesigninpostView,
    handlesigninpostApi:handlesigninpostApi
}*/

module.exports={
    userhome:userhome,
    //errors:errors,
    usersignup:usersignup,
    //userprofile:userprofile,
  // usersignin:usersignin
    
}