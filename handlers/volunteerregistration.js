var upload    = require('../models/upload');
var addvolunteer= async (req,res,next)=>{var fullPath;

  upload(req, res,(error) => {
        if(error){
          console.log('err');
        }else{
          if(req.file == undefined){

            console.log('err');

          }else{

              /**
               * Create new record in mongoDB
               */
            fullpath = "files/"+req.file.filename;


    }
  }
});
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
                      photo:fullpath,
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
module.exports={
  addvolunteer:addvolunteer
}
