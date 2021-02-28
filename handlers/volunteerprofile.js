const Volunteers=require('../models/Volunteer')
const Volunteer_Requests=require('../models/Volunteer_Request')
volunteerprofilehandleview=(req,res)=>{
  handle(req,res,VIEW)
}
volunteerprofilehandleapi=(req,res)=>{
    handle(req,res,API)
}
module.exports={
  volunteerprofilehandleview:volunteerprofilehandleview,
  volunteerprofilehandleapi:volunteerprofilehandleapi

}
function handle(req,res,reqtype){var ud;
  user_id=req.session.Auth;
  User.findOne({user_id:user_id},function(err,docs){
    if(err)
    console.log('error')
    else {
      ud=docs;
    }
  })
    Volunteers.findOne({user_id:user_id},
        function(err,docs){
            if(!err)
            {
                res.render("/view_profile",{
                    vold: docs,
                    userd:ud,
                });
            }
            else
            {
                console.log('failed to retrieve '+err);
            }
        });
      }
