//IMPORT DATABASE
var mongoose=require('mongoose')
//TO RETRIEVE AND DISPLAY THE SHOPS-SHOW SHOP
var shop=require('../models/shop')
//TO RETRIEVE AND DISPLAY THE ITEMS IN THE SHOP-SHOW INSIDE SHOP
var items=require('../models/items')
//TO ADD ORDER AFTER PLACING ORDER-BILLING
var  order=require('../models/orders')
//TO DISPLAY SHOPS NEAR US
async function handleshopsbasedonlocation(req,res,type){
    var token=req.body.token;
    var user=await Sessions.findOne({token:token}).lean();
    if(user)
    { 
        const shopkeeper=shops.aggregate([
            {
              $geoNear: {
                 near:user.location,
                 distanceField: "dist.calculated",
                 maxDistance:100,
               //  query: { category: "shops" },
               //  includeLocs: "dist.location",
                 spherical: true
              }
            }
         ])

    }
}

