(function(){
  //DATABASE CONNECTION AND REQUIRING COLLECTIONS
  const mongoose = require('mongoose'); 
  const shops=require('../models/shop')
  const items=require('../models/items')
  //const session=require('../models/session')
  const shopkeeper = require('../models/shopkeeper');
  //VALIDATE PASSWORD
  const passport=require('passport')
  const utils = require('../utils/validate');
  //GEOCODER TO CONVERT TEXT ADDRESS TO LATITUDE AND LONGITUDE FOR WEB APP
  const geocoder=require('../utils/geocoder')

//LOGIN OF USER USING JWT(COMMON TO BOTH WEB/MOBILE APP)
// Validate an existing user and issue a JWT
module.exports=function(app){
  
app.post('/login', function(req, res, next){

 
});
function handlegetlogin(req,res,type){
    if(type==view)
     {
        res.send('shopsignin');
     }
     else
     {
         res.json({success:'success'})
     }
}
function handlepostlogin(req,res,type){
    shopkeeper.findOne({ user_id: req.body.user_id })
    .then((user) => {

        if (!user) {
            res.status(401).json({ success: false, msg: "could not find user" });
        }
        
        // Function defined at bottom of app.js
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
        
        if (isValid) {

            const tokenObject = utils.issueJWT(user);
                if(type=='view')
            res.status(200).render('createshop',{success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
                else
                res.status(200).json({success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

        } else {

            res.status(401).json({ success: false, msg: "you entered the wrong password" });

        }

    })
    .catch((err) => {
        next(err);
    });
}
// Register a new user-USER LEVEL REGISTERATION
//INPUT EXPECTED BY BACKEND- A POST REQUEST THAT HAS THE USER REGISTERATION DETAILS COLLECTED FROM SHOPKEEPER
//OUTPUT GIVEN- A UNIQUE USER_ID THAT MUST BE PROVIDED BY SHOPKEEPER DURING USER LEVEL LOGIN NEXT TIME
//THINGS TO BE CHECKED BY APP DEVELOPERS- NAMES OF FIELDS USER INPUT THAT IS EXTRACTED FROM REQUEST
async  function registeruser(req, res,next){
    const saltHash = utils.genPassword(req.body.password);
    var name = req.body.name
    var phone = req.body.phone
    var email= req.body.email
    var type=req.body.type 
//TO PRESERVE USER PASSWORD AND AADHAR ID WE WILL HASH IT AND STORE IT
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        name : name,
        phone : phone,
        email : email,
        type:type   ,
        hash: hash,
        salt: salt
    });

    try {
    
        newUser.save()
            .then((user) => { var user_id=user.name+tostring(user.phone).substring(-5)+user.user_id;
                const tokenObject = utils.issueJWT(user);
                res.json({ success: true, user: user_id ,token: tokenObject.token, expiresIn: tokenObject.expires });
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

}
//REGISTER A NEW SHOPKEEPER-SHOPKEEPER LEVEL REGISTERATION
//INPUT EXPECTED -A POST REQUEST THAT HAS SHOPKEEPER DETAILS COLLECTED FROM SHOPKEEPER
async  function registershopkeeper(req, res,next){

    const newUser = new Shopkeeper({
        user_id: req.body.user_id,
        aadhar_id:req.body.aadhar_id,
              
    });

    try {
    
        await newUser.save()
            .then((shopkeeper) => {                const tokenObject = utils.issueJWT(shopkeeper);
                res.json({ success: true, shopkeeper_id: shopkeeper_id ,token: tokenObject.token, expiresIn: tokenObject.expires});
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

}
//USER LOGIN OVER


//DISPLAYING PREDEFINED ITEMS AVAILABLE TO CREATE VIRTUAL SHOP
async function handlegetItems(req,res,type){
var products=[];
products=await items.findAll().lean();
if(type==API)
res.json({products:products});
else
res.render('createshop',{products:products})
}


//PROVISION FOR AUTHENTICATED SHOPKEEPERS TO ADD ITEMS OTHER THAN PREDEFINED ITEMS THAT WERE ALREADY DISPLAYED
async function handleAddItems(req,res,next){
var newProducts=[];
var newProducts=req.body.newProducts;

    for(i=0; i<newProducts.length;i++)
    {newProducts.updateOne({ name:newProducts[i].name,company:newProducts[i].company},
           { $set:{company:newProducts[i].company,
                price:newProducts[i].price,
                additional_notes:newProducts[i].additional_notes,
                photo : newProducts[i].photo
                  },             
        },
       { upsert:true},(err,docs)=>{
           if(err)
              console.log('error')
            else
                var result='added'
                
       })
    
    }
    res.json({result:result})
}
//PROVISION FOR AUTHENTICATED SHOPKEEPERS TO CREATE SHOP
//INPUT NEEDED-//JWT THAT WAS PROVIDED AFTER LOGIN AND THAT WILL BE STORED IN SHAREDPREFERENCES
// PLEASE REFER SHOP SCHEMA FOR DATATYPE EXPECTED
//POST REQUEST FROM CLIENT WITH ADDRESS,SHOPNAME,CATEGORY,AVAILABLE DAY AND TIME(ARRAY),DAY1SLOTS(ARRAY),DAY2SLOTS(ARRAY),ITEMS(ARRAY OF ITEM IDS SELECTED BY SHOPKEEPER)
async function handlecreateshoppost (req,res,type){
    var token=req.body.token;
    var shopkeeper= await token.findOne({token:token}).select({clientid:1}).lean();
    geocoder.geocode(req.body.address).then((res)=>{var location=res}).catch((err)=>{console.log('error')})
var shopnew=new shops({
    shopkeeper_id:shopkeeper,
    shop_name:shop_name,
    category:category,
    available_day:req.body.available_day,   //CHANGE TO INCORPORATE DAYS
    available_time:req.body.available_time,
    address:req.body.address ,
    location:location,
    items:req.body.items,        
    day1_slots:req.body.day1_slots,
    day2_slots:req.body.day2_slots,
    delivery_available: req.body.delivery_available

})
shop.create(shop,function(err,shop){
    if(err)
    res.json({result:'failure'})
     else
       {if(type==API)
        res.json({result:'success',
                    shop:shop})
        else
           res.render('finalshop',{result:'success',
           shop:shop})
       }
})

}
//LIST OF URL LINKS
app.get('/api/getItems',async (req,res,next)=>{handlegetItems(req,res,API)})
app.post('/api/additems',passport.authenticate('jwt',{session:false}),async (req,res,next)=>{handleAddItems(req,res,API)})
app.post('/api/createshop',passport.authenticate('jwt',{session:false}),async (req,res,next)=>{handlecreateshoppost(req,res,API)})
app.post('/api/registeruser',async (req,res,next)=>{registeruser(req,res,next)})
app.post('/api/registershopkeeper',async (req,res,next)=>{registershopkeeper(req,res,next)})
app.get('/api/login',(req,res,next)=>{getloginhandle(req,res,api)})
app.get('/login',(req,res,next)=>{getloginhandle(req,res,view)})
app.post('/login',(req,res,next)=>{handlepostlogin(req,res,view)})
app.post('/api/login',(req,res,next)=>{handlepostlogin(req,res,api)})
}
})()