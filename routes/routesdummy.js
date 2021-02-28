
const express=require('express');
const{handlelogindisplayview}=require('./handlers/getpages')
const{volunteerprofile}=require('./handlers/volunteerprofile')
const{addvolunteer}=require('./handlers/volunteerregistration')
const { addstores, adduser , additems , addcustomer} = require('./handlers/stores');
const{  getnearbystoresview,getshopbynameview,getshopbytypeview,getshopbydateview, getnearbystoresapi,getshopbynameapi,getshopbytypeapi,getshopbydateapi}
 = require('./handlers/chooseshop');
const {  viewcart,removeitem,addtocart,checkout,reduceitem,showitem}=require('./handlers/addtocarthandler');
const{handleApi,handleView}=require('./handlers/loginfortestingsession');
const{ volunteerhomepageview }=require('./handlers/volunteerhomepage');
//const { viewcart }=require('./handlers/viewcart');
//const express=express.Router();
const router=express.Router();
router.post('/additems',additems);
router.get('/getshopbydate',getshopbydateview);
router.post('/getshopbyname',getshopbynameview);
router.post('/getshopbytype',getshopbytypeview);
router.post('/getnearbystores',getnearbystoresview)
router.get('/login',handlelogindisplayView);
router.post('/login',handleView);
router.post('/adduser',adduser);
router.post('/addcustomer',addcustomer);
router.post('/addvolunteer',addvolunteer);
router.post('/addstores',addstores);
router.get('/showitem',showitem);
router.get('/remove/:id',removeitem);
router.get('/reduce/:id',reduceitem);
router.get('/add-to-cart/:id',addtocart)
router.get('/viewcart', viewcart);
router.get('/checkout',checkout );
router.post('/volunteerhomepage',volunteerhomepageview);
/*
router.get('/shopping-cart',viewcart);
router.get('/shopping-cart',shoppingcartdisplay)
*/
module.exports = router;
/*(function(){

    var dummyHandler = require("./handlers/dummyHandler");

	module.exports = function(app){

      /*  app.all("/dummy",dummyHandler.handleView); // For GET and POST Request
		// app.get("/logout",userHandler.logout); // For GET Request
        // app.post("/",dummyHandler.handle);// For POST

        app.post("/api/dummy",dummyHandler.handleApi)

        app.get("/user",dummyHandler.handleuserView)
        app.get("/volunteer",dummyHandler.handlevolunteerView)
        app.get("/shopkeeper",dummyHandler.handleshopkeeperView)

        app.get("/api/user",dummyHandler.handleuserApi)
        app.get("/api/volunteer",dummyHandler.handlevolunteerApi)
        app.get("/api/shopkeeper",dummyHandler.handleshopkeeperApi)*/

      //  app.get("/api/nearbystores",dummyHandler.getnearbystores)


//	};
/*


})();*/