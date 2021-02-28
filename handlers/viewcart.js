var Cart=require('./addtocart');
module.exports.viewcart= function (req, res, next) {
    if (!req.session.cart) {
        return res.render('base.html', {products: null});
    }
    var cart = new Cart(req.session.cart.items);
    if(reqtype!='API')
    {res.render('base.html', {products: cart.generateArray(), totalPrice: cart.totalPrice});}
    else {
      res.json({products: cart.generateArray(), totalPrice: cart.totalPrice})
    }



}
