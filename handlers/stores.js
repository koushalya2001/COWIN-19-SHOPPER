const Volunteers=require('../models/Volunteer')
const User=require('../models/User')
const item=require('../models/items')
const shops=require('../models/shop')
const Customers=require('../models/Customer')
const NodeGeocoder = require('node-geocoder');
const shopkeeper = require('../models/shopkeeper');
const user=require('../models/User');
const options = {
  provider: 'mapquest',
  httpAdapter:'https',
  // Optional depending on the providers
  apiKey: 'V9W0ALcePSCONcoxO9AInSiljIagwGmO', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
}
const geocoder = NodeGeocoder(options);

/*

*/

//@desc get nearbystores based on user location which is given alongwith POST Request
//@route POST /getnearbystores
//@access public
var getnearbystores=async (req,res,next)=>{

  try{ var user=req.session.Auth;
       var customer=req.session.Authtwo;
        User.findOne({user_id:user,customer_id:customer},function(err,docs){if (err)
                                                                               console.log("error");
         else {
           const shopkeeper=shops.aggregate([
              {
                $geoNear: {
                   near:docs.location,
                   distanceField: "dist.calculated",
                   maxDistance:100,
                 //  query: { category: "shops" },
                 //  includeLocs: "dist.location",
                   spherical: true
                }
              }
           ])

           return res.status(200).json({
               success:true,
               count:shopkeeper.length,
               data:shopkeeper
             });


         }
       });
} catch (error){
               console.log('error')
                 res.status(500).json({error: 'server error'});
       }
}



//@desc add STORES
//@route POST /addstores
//@access public

var addstores= async (req,res,next)=>{
  try{
    const store=await User.create(req.body);
    return res.status(200).json({success:true,
    data:store})
  }
  catch(error)
  {
     console.log(error)
  }
}
//@desc add items to database
//@route POST /additems
//@access public

var additems= async (req,res,next)=>{
  try{
    const items=await item.create(req.body);
    return res.status(200).json({success:true,
    data:items})
  }
  catch(error)
  {
     console.log(error)
  }
}
//@desc add USER to database
//@route POST /signuppage1
//@access public
var adduser= async (req,res,next)=>{
  try{
    const customers=await User.create(req.body);
    return res.status(200).json({success:true,
    data:customers})
    console.log(customers)

  }
  catch(error)
  {
     console.log(error)
  }
}
//@desc add SHOPKEEPER to database
//@route POST /signuppage2
//@access public
var addshopkeeper= async (req,res,next)=>{
  try{
    const shopkeepers=await shopkeeper.create(req.body);
    return res.status(200).json({success:true,
    data:shopkeepers})
    console.log(shopkeepers)

  }
  catch(error)
  {
     console.log(error)
  }
}
//@desc add VOLUNTEER to database
//@route POST /signuppage2
//@access public
var addvolunteer= async (req,res,next)=>{
  try{
    var address=req.body.address;
     var apartment=req.body.address.line_1
     var street=req.body.address.line_2
      var area=req.body.address.line_3
    //   var house_no=req.body.address.line_2
       var state=req.body.address.state
       var pincode=req.body.address.pincode
       var district=req.body.address.district
             var addresses=apartment+ "," + street  +","+ area + ","+ district +","+  pincode +","+ state + ","+"India"
             console.log(addresses)
             const addressed= await geocoder.geocode(addresses);
             console.log(addressed)
             var location={
               type:"Point",
               coordinates:[addressed[0].longitude,addressed[0].latitude]
             }
             var add={ user_id:req.body.user_id,
                      age:req.body.age,
                      aadhar_id:req.body.aadhar_id,
                      photo:req.body.photo,
               address:{
    line_1:apartment,
    line_2:street,
    line_3:area,
    state:state,
    district:district,
    pincode:pincode
},
              location:location
             }
    const volunteerstore=await Volunteers.create(add);
    if(reqtype=='web')
  { return res.status(200).json({success:true,
    data:volunteerstore})
  }
  else {
    res.json(user);
  }
    console.log(user)
  }
  catch(error)
  {
     console.log(error)
  }
}
//@desc add CUSTOMER to database
//@route POST /signuppage2
//@access public
var addcustomer= async (req,res,reqtype)=>{
  try{
    var address=req.body.address;
     var apartment=req.body.address.line_1
     var street=req.body.address.line_2
      var area=req.body.address.line_3
    //   var house_no=req.body.address.line_2
       var state=req.body.address.state
       var pincode=req.body.address.pincode
       var district=req.body.address.district
             var addresses=apartment+ "," + street  +","+ area + ","+ district +","+  pincode +","+ state + ","+"India"
             console.log(addresses)
             const addressed= await geocoder.geocode(addresses);
             console.log(addressed)
             var location={
               type:"Point",
               coordinates:[addressed[0].longitude,addressed[0].latitude]
             }
             var add={ user_id:req.body.user_id,
               address:{
    line_1:apartment,
    line_2:street,
    line_3:area,
    state:state,
    district:district,
    pincode:pincode
    },
              location:location
             }
    const user=await Customers.create(add);
    if(reqtype=='web')
  { return res.status(200).json({success:true,
    data:user})
  }
  else {
    res.json(user);
  }
    console.log(user)
  }
  catch(error)
  {
     console.log(error)
  }
}
module.exports={
  addstores:addstores,
  getnearbystores:getnearbystores,
  adduser:adduser,
  additems:additems,
  addcustomer:addcustomer
}
//SAMPLE CUSTOMER DATA TO SIGNUP
/*{
    "user_id":2,
    "address":{
    "line_1":"Sams apartment",
    "line_2":"Anna Nagar",
    "line_3":"65,valluvar street",
    "state":"Tamil Nadu",
    "district":"Chennai",
    "pincode":6000106
}
}*/

//SAMPLE VOLUNTEER DATA TO SIGNUP
/*{
    "user_id" : 9,
    "age" :25,
    "aadhar_id":100000000001,
    "photo" : "PHOTO.JPG",
    "address" : {
    	  "line_1":"Sams apartment",
    "line_2":"Anna Nagar",
    "line_3":"65,valluvar street",
    "state":"Tamil Nadu",
    "district":"Chennai",
    "pincode":6000106
    }
}*/
//SAMPLE SHOPKEEPER SIGNUP
/*{

    user_id:Number,
    shopkeeper_id:Number,
    aadhar_id:{type:Number,min:100000000000,max:999999999999},


}*/
//SAMPLE USER DATA TO SIGNUP
/*{
    "name" : "thirumeni amma",
    "phone" : 916379068527,
    "email" : "tom@gmail.com",
    "password" : "om123567891",
    "type":"volunteer"
}*/



//COMMENT
/*
{name:String,
company:String,
price:Number,
additional_notes:String,
photo : String,

}

{

    user_id : Number,
    customer_id : Number,
    address : {type: addressSchema},
    location : { type : pointSchema}
}

{
    name : String,
    phone : Number,
    email : String,
    user_id : Number,
    password : String,
    type:String   //INCLUDED THE EDITION MADE BY SHOPKEEPER MODULE
}
*/
/*
         var address=req.body.address;
          var door_no=req.body.address.line_1
          var house=req.body.address.line_2
           var street=req.body.address.line_3
         //   var house_no=req.body.address.line_2
            var state=req.body.address.state
            var pincode=req.body.address.pincode
            var district=req.body.address.district
                  var addresses=street +","+ district +","+  pincode +","+ state + ","+"India"
                  console.log(addresses)
                  const addressed= await geocoder.geocode(addresses);
                  console.log(addressed)
                  var location={
                    type:"Point",
                    coordinates:[addressed[0].longitude,addressed[0].latitude]
                  }
                  var add={ user_id:req.body.user_id,
                    address:{
         line_1:door_no,
         line_2:"Mahalakshmi flats",
         line_3:"Abdul Razack street",
         state:"Tamil Nadu",
         district:"Chennai",
         pincode:600015
     },
                   location:location
                 }*/
