var express = require('express');

const response = require('../helper/response');
var router = express.Router();
let categoriesctrl = require('../controller/categoriescontroller')
let productctrl = require('../controller/productcontroller');
let userctrl = require('../controller/usercontroller')
let offerctrl = require('../controller/offercontroller');
let colorctrl = require('../controller/colorcontroller')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// __________________________________________login page
router.get('/login',(req,res)=>{
console.log(req.session);
  if (req.session.status) {
    
    res.redirect('/admin');
    
  } else {
    let data = req.session.msg
    let response1
    if (req.session.response) {
     response1 = req.session.response.msg
  }
  console.log(response1);
    res.render('login',{data,response1})
  }
})

router.get('/forgotpassword',(req,res)=>{
  console.log(req.session);
  if (req.session.response) {
    let data = req.session.response.msg
    res.render('forgotpassword',{data})
  } else {
    data =''
    res.render('forgotpassword',{data})
  }
})

router.get('/recoverpassword/:token',(req,res)=>{
  res.render('recoverpassword')
})

// __________________________________________admin dashboard
router.get('/admin',(req,res)=>{
   if (req.session.status) {
    res.render('admin');
    
  } else {
    res.redirect('/login')
  }
}) 
// ____________________________________________categories
router.get('/categories',categoriesctrl.getcategories)

router.get('/editcategories',categoriesctrl.editcategories)
//res.render('category/editcategories')
// ___________________________________________products
router.get('/products/:page?',productctrl.getproducts)
//res.render('product/products')
router.get('/editproducts',productctrl.editproducts)

router.get('/productsdetails',productctrl.getproductsdetails)

router.get('/editproductdetails',productctrl.geteditproductsdetails)
  
// _________________________________________users
router.get('/users',userctrl.getusers)

router.get('/userdetails/:id',(req,res)=>{
  res.render('users/userdetails')
})


// _____________________________________offers
router.get('/offers/:page?',(req,res)=>{
  res.render('offers/offers')
})

router.get('/editoffer/:id',(req,res)=>{
  res.render('offers/editoffer')
})
// _____________________________________color
router.get('/color',(req,res)=>{
  console.log('query paramsss',req.query);
  if (req.params) {
    res.render('color/color',{sort:req.query.sort,order:req.query.order,page:req.query.page})
  } else {
    res.render('color/color')
  }
})

module.exports = router;
