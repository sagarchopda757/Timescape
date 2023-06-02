var express = require('express');
var router = express.Router();
require('express-group-routes');

let adminctrl = require('../controller/admincontroller')
let categoriesctrl = require('../controller/categoriescontroller')
let productctrl = require('../controller/productcontroller');
let userctrl = require('../controller/usercontroller')
let offerctrl = require('../controller/offercontroller');
let colorctrl = require('../controller/colorcontroller')

let uiusercontroller = require('../controller/ui/usercontroller')
// ______________________________________admin controller
//login
router.post('/login',adminctrl.login)
//logout
router.get('/logout',adminctrl.logout)

router.post('/forgotpassword',adminctrl.forgotpassword)

router.post('/recoverpassword/:token',adminctrl.recoverpassword)
//______________________________________categories controller
//router.get('/getcategories/:page?',categoriesctrl.getcategories)

router.post('/addcategories',categoriesctrl.addcategories)

router.get('/deletecategories',categoriesctrl.deletecategories)

//router.post('/editcategories/:id',categoriesctrl.editcategories)

router.post('/updateeditcategories/:id',categoriesctrl.updateeditcategories)

router.get('/changecategorystatus/:id',categoriesctrl.changecategorystatus)

//_____________________________________product controller
//router.get('/getproducts/:page?',productctrl.getproducts)

router.post('/addproducts',productctrl.addproducts)

router.get('/getcategoriesdetails',productctrl.getcategoriesdetails)

router.get('/deleteproducts',productctrl.deleteproducts)

//router.get('/editproducts/:id',productctrl.editproducts)

router.post('/updateeditproducts',productctrl.updateeditproducts)

//router.get('/getproductsdetails/:id/:page?',productctrl.getproductsdetails)

router.get('/deleteproductsdetails',productctrl.deleteproductsdetails)

router.get('/getcolors',productctrl.getcolors)

router.post('/addproductdetails',productctrl.addproductdetails)

router.get('/geteditproductsdetails/:id',productctrl.geteditproductsdetails)

router.post('/updateeditproductsdetails',productctrl.updateeditproductsdetails)

router.get('/changeproductstatus',productctrl.changeproductstatus)

router.get('/changeproductdetailsstatus',productctrl.changeproductdetailsstatus)

// _________________________________________users controller

router.get('/getusers/:page?',userctrl.getusers)

router.get('/deleteusers/:id',userctrl.deleteusers)

router.get('/getuserdetails/:id',userctrl.getuserdetails)

router.get('/changeuserstatus/:id',userctrl.changeuserstatus)

//___________________________________________offer controller
router.get('/getoffer/:page?',offerctrl.getoffer) 

router.get('/deleteoffer/:id',offerctrl.deleteoffer)

router.post('/addoffer',offerctrl.addoffer)

router.get('/geteditoffer/:id',offerctrl.geteditoffer)

router.post('/updateeditoffer/:id',offerctrl.updateeditoffer)


// ____________________________________________________color controller
router.get('/getcolor/:page?',colorctrl.getcolor)

router.get('/deletecolor/:id',colorctrl.deletecolor)

router.post('/addcolor',colorctrl.addcolor)

// ___________________________________________________ui user controller
router.group('/appui',(router)=>{
    router.get('/signup',uiusercontroller.signup)

    router.get('/verify/:token',uiusercontroller.verify)
    
    router.post('/login',uiusercontroller.login)
    
    router.get('/logout/:token',uiusercontroller.logout)
    
    router.get('/getcategories',uiusercontroller.getcategories)

    router.get('/getproducts/:cat_id',uiusercontroller.getproducts)

    router.get('/singleproduct/:prod_id',uiusercontroller.singleproduct)

    router.get('/basket',uiusercontroller.basket)
    
    router.get('/getorders',uiusercontroller.getorders)

    router.get('/geteditdetailsinfo',uiusercontroller.geteditdetailsinfo)

    router.post('/updateeditdetails',uiusercontroller.updateeditdetails)
})

module.exports=router;
