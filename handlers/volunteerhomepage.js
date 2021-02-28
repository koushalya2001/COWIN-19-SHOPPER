const API=1
const VIEW=0
const Volunteers=require('../models/Volunteer')
const Volunteer_Requests=require('../models/Volunteer_Request')

function handle(req,res,reqtype)
{
      user_id=req.session.Auth

  Volunteers.findOne({user_id:user_id},function(docs,err){
  if(err)
     console.log('error')
  else {   //VARIABLES TO HOLD LOCATIO,PENDING AND COMPLETED REQUESTS
                   var location=docs.address;var completed;var pending;
//FINDING PENDING ORDERS BASED ON STATUS=ACCEPTED(NUMBER-5) AND VOLUNTEER_ID=CURRENT VOLUNTEER_ID
    Volunteer_Requests.find({volunteer_id:docs.volunteer_id},{status:2},function(err,pend){
      if(err)
        console.log('error')
        else {
            pending=pend;
        }
});
//FINDING PENDING ORDERS BASED ON STATUS=COMPLETE(NUMBER-8) AND VOLUNTEER_ID=CURRENT VOLUNTEER_ID
        Volunteer_Requests.find({volunteer_id:docs.volunteer_id},{status:3},function(err,comp){
          if(err)
            console.log('error')
            else {
                completed=comp;
            }

    });

    if(reqtype==API)
    {
      res.json({
             location:location,
             pending:pending,
             completed:completed

      })
    }
    else {
      res.render('volunteerhomepage',{
             location:location,
             pending:pending,
             completed:completed

      })
    }

  }

  })

}
var volunteerhomepageview=function(req,res){
  handle(req,res,VIEW)
}
var volunteerhomepageapi=function(req,res){
  handle(req,res,API)
}
module.exports={
  volunteerhomepageview:volunteerhomepageview,
  volunteerhomepageapi:volunteerhomepageapi,
}
