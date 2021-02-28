var volunteer=require('../models/Volunteer')
var user=require('../models/User')
var customer=require('../models/Customer')

//description-profile display and edition of VOLUNTEERS
//get request to first display their profile
//public

var profiledisplayview=async (req,res,next)=>{
handle(req,res,view)
}
var profiledisplayapi=async (req,res,next)=>{
handle(req,res,api)
}
function handle(req,res,type)
{
  var profilepart1=await user.find({user_id:user_id})
  var profilepart2=await customer.find({user_id:user_id})
    if(type==view){
      res.render('profile',{profilepart1:profilepart1,profilepart2:profilepart2})
    }
    else{
      res.json({profilepart1:profilepart1,profilepart2:profilepart2})
    }
}
//DESCRIPTION-POST REQUEST TO ACCEPT CHANGES
var profileeditionview=async (req,res,next)=>{
handle(req,res,view)
}
var profileeditionapi=async (req,res,next)=>{
handle(req,res,api)
}
function handle(req,res,type)
{


    if(type==view){
      res.render('profile',{profilepart1:profilepart1,profilepart2:profilepart2})
    }
    else{
      res.json({profilepart1:profilepart1,profilepart2:profilepart2})
    }
}
