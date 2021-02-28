var shop=require('../models/shop')
var items=require('../models/items')
var displayproductsbasedonshop=(req,res)=>{
shop.find({shop_id: req.body.shop_id},
     function(err,docs){
         if(!err)
         {
             var arr_name = {};
 var arr_company={};
 var arr_price={};
 var notes={};
             docs.forEach(function(element)
             {
                items.find({item_id: element.items.item_id},
                     function(err,item){
                         if(!err){
                             arr_name.push(item.Name);
     arr_company.push(item.Company);
     arr_price.push(item.price);
     notes.push(item.additional_notes);
                         }
                         else{
                             console.log('shop id not found'+err);
                         }
                     });
             });

             res.render("/list_of_items",{
                 list: docs,
                 array_name: arr_name,
     array_company: arr_company,
     array_price: arr_price,
     array_notes: notes
             });
         }
         else{
             console.log('failed to retrive'+err);
         }
     });
}
