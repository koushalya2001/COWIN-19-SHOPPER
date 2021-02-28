const API = 1;
const VIEW = 0;
   const getnearbystoresview=require('../handlers/chooseshop')
var Users = require("../models/User");
var Shop = require("../models/shop");
var Customers = require("../models/Customer");
var shopkeeper = require("../models/shopkeeper");
var Volunteers = require("../models/Volunteer");
function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
function handle(req,res,reqtype){
  /*  Shop.remove({}, (err, data) => console.log(data));
    Users.remove({}, (err, data) => console.log(data));
    Users.find({}, (err, data) => console.log(data));*/

    Users.find({ "name": req.body.user, "password": req.body.password}
    ,function(err,User){
      if(err)
      console.log('err')
      else
        {var output;

        if(!(isEmptyObject(User))) //login if user loging credentials are valid
        { console.log('user type')
          /*  output = {
                "user" : req.body.user,
                "content" : "Logged in"
            };*/
            /*
             session management
            */
            req.session.Auth=User.user_id;
            console.log(req.session.Auth)
            if(User.type=='shopkeeper')
            { shopkeeper.find({user_id:User.user_id},function(docs,err){
              if(err)
              console.log(err)
              else {
                req.session.Authtwo=docs.shopkeeper_id;
              }
            })
          }
          else if(User.type=='customer')
          {   Customers.find({user_id:User.user_id},function(docs,err){
            if(err)
            console.log(err)
            else {
              req.session.Authtwo=docs.customer_id;
              console.log('customer session set')
              if(reqtype == API)
                  res.json(output);
              else

                getnearbystoresview(req,res,view)
            }
          })
        }
        else
        {   Volunteers.find({user_id:User.user_id},function(docs,err){
          if(err)
          console.log(err)
          else {
            req.session.Authtwo=docs.aadhar_id;
          }
        })
      }


        }

        else { console.log('om')
            /*output = {
                "name" : req.body.user,
                "content" : "Log-in failed"
            };*/
        }
}

    })
}
var handleApi = function(req,res){

// The API calls are called from Android app. They need the data in JSON format. Hence we use res.json


  handle(req,res,API);
}

var handleView = function(req,res){

    handle(req,res,VIEW);
}
module.exports={
  handleApi:handleApi,
  handleView:handleView
}
