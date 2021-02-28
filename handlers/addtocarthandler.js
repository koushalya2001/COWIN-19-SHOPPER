var Cart=require('./addtocart');
var items=require('../models/items')


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
  }
var showitem= function (req, res, next) {
    var successMsg = req.flash('success')[0];
    items.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('finalcart.html', {title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
    });

}
 var addtocart=function(req,isLoggedIn, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
}

var reduceitem= function(req,isLoggedIn, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
}
var removeitem=function(req,isLoggedIn, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
}

var viewcart= function(req,isLoggedIn, res, next) {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
}

var checkout= function(req,isLoggedIn, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
}

module.exports={
  viewcart:viewcart,
  removeitem:removeitem,
  addtocart:addtocart,
  checkout:checkout,
  reduceitem:reduceitem,
  showitem:showitem

}
/*router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_fwmVPdJfpkmwlQRedXec5IxR"
    );*/
    /*module.exports.addtocarthandler=function (req, res, reqtype) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart.items : {});

        items.findById(itemId, function (err, product) {
            cart.add(product, product.id);
            req.session.cart = cart;
            if(reqtype!='API')
            {res.redirect('/');}
            else {
              res.json({status:added})
            }
        });
    }*/
