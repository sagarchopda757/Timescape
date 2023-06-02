let response = require('../../helper/response')
const db = require('../../models/index')
let { users, categories_master, products, productdetails, favourites, cart, address, order } = db
var jwt = require('jsonwebtoken');
const Joi = require('joi');
var md5 = require('md5');

let sendmail = require('../../helper/sendmail').sendmail
require('dotenv').config()

// ________________________________________________________user signup
let signup = async (req, res) => {
    try {
        data = req.body
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(30),
            email: Joi.string().required().email(),
            gender: Joi.string().required(),
            password: Joi.string().required().min(6),
            confirmpassword: Joi.ref('password'),
            mobileno: Joi.string().length(10).pattern(/^[0-9]+$/).required()
        })
        const result = schema.validate(data)
        if (result.error) {
            return res.json(response('validation error', false, result.error.details[0].message))
        }

        let query = await users.findOne({ where: { email: req.body.email } })
        // console.log(query);
        if (!query) {
            var authtoken = jwt.sign({ email: req.body.email }, process.env.secret_key);
            data = {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                password: md5(req.body.password),
                mobileno: req.body.mobileno,
                user_login_type: 0,
                auth_token: authtoken
            }
            let signup = await users.create(data)
            //console.log(signup);
            if (signup) {
                mail = {
                    to: req.body.email,
                    subject: `Timescape verification`,
                    html: `<b>this is verification mail from timescape<b><br>
                    <a href='http://localhost:3001/appui/verify/${authtoken}'>click here to verify</a>`
                }
                sendmail(mail)

                return res.json(response('signup successful verify mail to continue', true, null))

            } else {
                return res.json(response('something went wrong', false, null))
            }
        } else {
            if (query) {
                return res.json(response('user already exist', false, null))
            } else {
                return res.json(response('something went wrong', false, null))
            }
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// _____________________________________________________user verification
let verify = async (req, res) => {
    try {

        // console.log(req.params);
        let query = await users.findOne({ where: { auth_token: req.params.token } })
        // console.log(query);
        if (query) {
            if (query.dataValues.auth_token === req.params.token) {

                let query1 = await users.update({ auth_token: null, isverified: 1 }, { where: { id: query.dataValues.id } })
                //   console.log(query1);
                if (query1[0] === 1) {
                    return res.json(response('user verfied', true, req.params.token))
                } else {
                    return res.json(response('Something went wrong', false, null))
                }
            } else {
                return res.json(response('Something went wrong', false, null))
            }
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// ______________________________________________________________user login
let login = async (req, res) => {
    try {
        console.log(req.body);

        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6),
        })
        const result = schema.validate(req.body)
        if (result.error) {
            return res.json(response('validation error', false, result.error.details[0].message))
        }
        let query = await users.findOne({ where: { email: req.body.email } })
        //console.log(query);
        if (query) {
            if (query.dataValues.password === md5(req.body.password)) {
                var auth_token = jwt.sign({ email: req.body.email, id: query.dataValues.id }, process.env.secret_key);
                let query1 = await users.update({ auth_token: auth_token }, { where: { id: query.dataValues.id } })

                if (query1[0] === 1) {

                    return res.json(response('login successful', true, { token: auth_token }))
                } else {
                    return res.json(response('something went wrong', false, null))
                }
            } else {
                return res.json(response('something went wrong', false, null))
            }
        } else {
            return res.json(response('user does not exist ', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// __________________________________________________________user logout
let logout = async (req, res) => {
    try {
        console.log(req.params);
        var decoded = jwt.verify(req.params.token, process.env.secret_key);
        let query = await users.update({ auth_token: null }, { where: { email: decoded.email } })
        if (query[0] === 1) {
            return res.json(response('logout successfully', true, null))
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// _______________________________________________________get all categories
let getcategories = async (req, res) => {
    try {
        let query = await categories_master.findAll({ where: { cat_isdeleted: 0, cat_status: 'active' } })
        if (query) {
            return res.json(response('categories details', true, query))
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// _________________________________________________________get all product of particular categories
let getproducts = async (req, res) => {
    try {
        console.log(req.headers);
        var decoded = jwt.verify(req.headers.token, process.env.secret_key);
        console.log(decoded);
        products.hasMany(favourites, { foreignKey: 'prod_id' })
        favourites.belongsTo(products, { foreignKey: 'user_id' })
        let query = await products.findAll({
            where: { prod_isdeleted: 0, prod_status: 'active', cat_id: req.params.cat_id },
            include: [{
                model: favourites,
                required: false,
                where: { user_id: decoded.id }
            }]
        })
        if (query) {
            return res.json(response('product details', true, query))
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// ________________________________________________________get product details of selected product
let singleproduct = async (req, res) => {
    try {
        var decoded = jwt.verify(req.headers.token, process.env.secret_key);
        console.log(decoded);
        products.hasMany(productdetails, { foreignKey: 'prod_id' })
        productdetails.belongsTo(products, { foreignKey: 'prod_id' })

        products.hasMany(favourites, { foreignKey: 'user_id' })
        favourites.belongsTo(products, { foreignKey: 'user_id' })

        let query = await products.findOne({
            where: { prod_id: req.params.prod_id },
            include: [
                {
                    model: productdetails,
                },
                {
                    model: favourites
                }
            ]
        })
        if (query) {
            return res.json(response('single product details', true, query))
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// ___________________________________________________display products in cart
let basket = async (req, res) => {
    try {
        var decoded = jwt.verify(req.headers.token, process.env.secret_key);
        console.log(decoded);
        products.hasMany(cart, { foreignKey: 'prod_id' })
        cart.belongsTo(products, { foreignKey: 'prod_id' })
        let query = await cart.findAll({
            where: { user_id: decoded.id },
            include: [
                {
                    model: products
                },
            ]
        })
        if (query) {
            return res.json(response('cart details', true, query))
        } else {
            return res.json(response('something went worng', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// __________________________________________________display order details 
let getorders = async (req, res) => {
    try {
        var decoded = jwt.verify(req.headers.token, process.env.secret_key);
        console.log(decoded);
        users.hasMany(address, { foreignKey: 'user_id' })
        address.belongsTo(users, { foreignKey: 'user_id' })
        users.hasMany(order, { foreignKey: 'user_id' })
        order.belongsTo(users, { foreignKey: 'user_id' })
        products.hasMany(order, { foreignKey: 'proddet_id' })
        order.belongsTo(products, { foreignKey: 'proddet_id' })
        let query = await users.findOne({
            attributes: ['name', 'mobileno'],
            where: { id: decoded.id },
            include: [
                {
                    model: address,
                    where: { isdeleted: 0 },

                },
                {
                    attributes: ['shippingtype'],
                    model: order,
                    include: [
                        {
                            model: products,
                            attributes: ['prod_price']
                        }
                    ]
                }
            ]
        })
        if (query) {
            return res.json(response('order details', true, query))
        } else {
            return res.json(response('something went wrong', false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}

let geteditdetailsinfo = async(req,res)=>{
    try {
        var decoded = jwt.verify(req.headers.token, process.env.secret_key);
        console.log(decoded);
        users.hasMany(address, { foreignKey: 'user_id' })
        address.belongsTo(users, { foreignKey: 'user_id' })
        users.hasMany(order, { foreignKey: 'user_id' })
        order.belongsTo(users, { foreignKey: 'user_id' })
        
        let query = await users.findOne({
            attributes: ['name', 'mobileno'],
            where: { id: decoded.id },
            include: [
                {
                    model: address,
                    where: { isdeleted: 0 },

                },
                {
                    attributes: ['shippingtype'],
                    model: order,
                  
                }
            ]
        })
        if (query) {
            return res.json(response('order details', true, query))
        } else {
            return res.json(response('something went wrong', false, null))
        }

        
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }
}
let updateeditdetails = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }
}
module.exports = {
    signup, verify, login, logout,
    getcategories, getproducts, singleproduct,
    basket, getorders,geteditdetailsinfo, updateeditdetails
}