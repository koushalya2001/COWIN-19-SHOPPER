const Customers=require('../models/Customer')
const shops=require('../models/shop')
const api=1
const view=0
/*
if(reqtype == API)
    res.json(output);
else
    res.render("allshops.html",output);
*/

//source-CUSTOMER SIGNUP PAGE
//@desc get nearbystores based on user location which is given alongwith POST Request
//@route POST /getnearbystores
//@access public
//DESTINATION allshops.html
//data sent:- shop documents under that category
//data used:-a dynamic loop displays shops.name and corresponding href has /getshop/{{shop.id}}
var getnearbystoresview=(req,res,reqtype)=>
{
  handlegetnearbystores(req,res,view);
}
var getnearbystoresapi=(req,res,reqtype)=>
{
  handlegetnearbystores(req,res,api);
}
async function handlegetnearbystores(req,res,reqtype){
  try{
//FINDING RECENT SHOPS
    cd=-30*24*60*60*1000;
    const recent=shops.aggregate([
       {
         $geoNear: {
            near:req.body.user.location,
            distanceField: "dist.calculated",
            maxDistance:100,
           query: {createdAt: {
               $lte:Date.now()
            }},
          //  includeLocs: "dist.location",
            spherical: true
         }
       }
    ])
   
  
      //FINDING SHOPS NEAR USER

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
               if(reqtype==api)
           {return res.status(200).json({
               success:true,
               shops:shopkeeper
             });
           }
           else {
             return res.render('allshops',{shops:shopkeeper,recent:recent})
           }

         }
       });
     }catch(err)
     {
       console.log('error')
     }
}
//@desc a post request with shopname is given
//@route POST /getshopbyname
//@access public
//DESTINATION shopbyname.html
var getshopbynameview=(req,res)=>
{
  handleshopbyname(req,res,view);
}
var getshopbynameapi=(req,res)=>
{
  handleshopbyname(req,res,api);
}

function handleshopbyname(req,res,reqtype){
  var shop_name=req.body.shopname;
  shops.findOne({shop_name:shop_name
  },function(docs,err){
    if(err)
     console.log(err)
     else {
       if(reqtype==api)
      {res.json({success:'success',
                 route:docs,
                })
      }
      else {
        res.render({status:'success',
                   route:docs,
                  })
      }
     }

  })
}
//@desc a post request with shoptype-bookstore,pharmacy,grocery,stationery is given(fetch is used)
//@route POST /getshopbytype
//@access public
//DESTINATION shopbytype.html
//data sent:- shop documents under that category
//data used:-a dynamic loop displays shops.name and corresponding href has /getshop/{{shop.id}}
var getshopbytypeview=(req,res)=>
{
  handle(req,res,view);
}
var getshopbytypeapi=(req,res)=>
{
  handle(req,res,api);
}

function handle(req,res,reqtype){

  shops.findAll({category:req.body.category},function(shop,err){
  if(err)
    console.log('error')
  else
  { if(reqtype==view)
    {res.json({shops:shop})
    }
    else {
      res.json({shops:shop})
    }
}
})

}
//SOURCE OF POST REQUEST-CUSTOMER SIGNUP PAGE
//@desc a GET request -(fetch is used)
//@route GET /getshopbydate
//@access public
//DESTINATION allshops.html
//data sent:- shop documents under that category
//data used:-a dynamic loop displays shops.name and corresponding href has /getshop/{{shop.id}}
function handlerecent(req,res,reqtype){ var date1 = new Date();
     date1.setDate(date1.getDate()-30);
  shops.find({
        createdAt: {
            $gte:date1.toISOString()
         }
     },function(shop,err){
       if(reqtype==view)
         { console.log(shop)
           res.render('allshops',{shops:shop})
         }
         else {
           res.json({recent:shop})
         }
     })
}
var getshopbydateview=(req,res)=>{
  handlerecent(req,res,view)
}
var getshopbydateapi=(req,res)=>{
  handlerecent(req,res,api)
}
module.exports={  getnearbystoresview:getnearbystoresview,getshopbynameview:getshopbynameview,getshopbytypeview:getshopbytypeview,getshopbydateview:getshopbydateview, getnearbystoresapi:getnearbystoresapi,getshopbynameapi:getshopbynameapi,getshopbytypeapi:getshopbytypeapi,getshopbydateapi:getshopbydateapi}
//RECENT SHOPS NOT INCLUDING LOCATION
/*shop.find({
      createdAt: {
          $gte:cd.toISOString()
       }
   ,function(shops,err){
     if(err)
       {console.log('err')
       }
       else {
        recent=shops;
       }
   }})*/
