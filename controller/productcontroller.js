let db = require('../models/index')
let { products, productdetails, categories_master, color_master } = db
let response = require('../helper/response');

let imageupload = require('../helper/imageupload')
let pagination = require('../helper/pagination')
// ___________________________________________get all product 
let getproducts = async (req, res) => {
    try {
        let search={}
        if (req.query.searchfield) {
            search={
                prod_isdeleted: 0,
                cat_name:{ [Op.startsWith]: `${req.query.searchfield}`}
            }
        } else {
            search={
                prod_isdeleted: 0
             
            }
        }
        let page = await pagination(req.query.page)
        let {count,rows} = await products.findAndCountAll({ 
            where: { prod_isdeleted: 0 },
            offset:page.offset,
            limit:10
        })

       // console.log(rows);
        if (rows) {
            return res.render('product/products',{count:count,rows:rows,page:page.page})
            return res.json(response('product details',true,{count:count,rows:rows,page:page.page}))
        } else {
            return res.json(response('something went wrong'))
        }
    } catch (error) {
        console.log(error);
       return res.json(response('internal server error', false, null))
    }
}
// __________________________________________________________________add products
let addproducts = async (req, res) => {
    try {
        console.log(req.body);
        // adddata = {
        //     prod_name: req.body.prod_name,
        //     prod_price: req.body.prod_price,
        //     prod_brand: req.body.prod_brand,
        //     prod_description: req.body.prod_description,
        //     cat_id: req.body.cat_id,
        //     prod_status: req.body.prod_status
        // }

        let query = await products.create(req.body)
        if (query) {
            return res.json(response("product added successfully", true, null))
        } else {
            return res.json(response("something went wrong", false, null))
        }
        return res.json(response('done', true, null))
    } catch (error) {
        console.log(error);
        return res.json(response("internal server error", false, null))

    }

}
// __________________________________________________get categories while adding products
let getcategoriesdetails = async (req, res) => {
    try {

        let query = await categories_master.findAll({ where: { cat_isdeleted: 0 } })
        // console.log(query);
        return res.json(response('got categories', true, query))
    } catch (error) {
        console.log(error);
        return res.json(response("internal server error", false, null))
    }
}
// ______________________________________________________delete products
let deleteproducts = async (req, res) => {
    try {
        let query = await products.update({ prod_isdeleted: 1 }, { where: { prod_id: req.query.id } })
        if (query[0] === 1) {
            return res.redirect('/products')
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// ______________________________________________________________get products details in edit product page
let editproducts = async (req, res) => {
    try {
        console.log("editproducts",req.query);
        let query = await products.findOne({ where: { prod_id: req.query.id, prod_isdeleted: 0 } })
        console.log(query);
        if (query) {
            return res.render('product/editproducts',{data:query.dataValues})
            return res.json(response('products details', true, query.dataValues))
        } else {
            return res.json(response('something went wrong', false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
//____________________________________________________________update edited product in edit product page
let updateeditproducts = async (req, res) => {
    try {
        // data = {
        //     prod_name: req.body.prod_name,
        //     prod_price: req.body.prod_price,
        //     prod_brand: req.body.prod_brand,
        //     cat_id: req.body.cat_id,
        //     prod_description: req.body.prod_description,
        //     prod_status: req.body.prod_status
        // }
         console.log(req.body);
        let query = await products.update(req.body, { where: { prod_id: req.query.id, prod_isdeleted: 0 } })
        console.log(query);
        if (query[0] === 1) {
            return res.json(response('product updated', true, null))
        } else {
            return res.json(response('something went wrong', false, null))

        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }

}
// ___________________________________________________________________________display all productdetails
let getproductsdetails = async (req, res) => {
    try {
        products.hasMany(productdetails, { foreignKey: 'prod_id' });
        productdetails.belongsTo(products, { foreignKey: 'prod_id' });

        color_master.hasMany(productdetails, { foreignKey: 'color_id' });
        productdetails.belongsTo(color_master, { foreignKey: 'color_id' })
        console.log('product deatails',req.query);

        let page = await pagination(req.query.page)
        let {count,rows} = await products.findAndCountAll({
            where: { prod_id: req.query.id },
            include: [
                {
                    model: productdetails,
                    where: { isdeleted: 0 },
                    required: false,
                    include: [
                        {
                            model: color_master
                        }
                    ]
                }
            ],
            offset:page.offset,
            limit:10

        })
      
        if (rows) {
           // res.render('product/productsdetails')
           return res.render('product/productsdetails',{count:count,rows:rows,page:page.page})
          //  return res.json(response('products details', true, {count:count,rows:rows,page:page.page}))

        } else {

            return res.json(response('something went wrong', false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// __________________________________________________________________delete product from product details form
let deleteproductsdetails = async (req, res) => {
    try {
        console.log(req.query);
        let query = await productdetails.update({ isdeleted: 1 }, { where: { id: req.query.id } })

        if (query[0] === 1) {
            return res.redirect(`/productsdetails?id=${req.query.prod_det}`)
            //return res.json(response('product details deleted', true,null))
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }

}
// _________________________________________________________get colors in product details form
let getcolors = async (req, res) => {
    try {
        let query = await color_master.findAll()
        if (query) {
            return res.json(response('got colors', true, query))
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// _______________________________________________________add productdetails
let addproductdetails = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No files were uploaded.');
        }
        if (req.files) {
            image = await imageupload('product_images/', req.files)
            if (image) {
                data = {
                    color_id: req.body.color_id,
                    banner: req.body.banner,
                    quantity: req.body.quantity,
                    image: image,
                    prod_id: req.body.prod_id
                }
            }
        } else {
            data = {
                color_id: req.body.color_id,
                banner: req.body.banner,
                quantity: req.body.quantity,
                prod_id: req.body.prod_id
            }
        }
        console.log(data);
        let query = await productdetails.create(data)
        if (query) {
            return res.json(response('produt details added successfully', true, null))
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
//____________________________________________________________get editproduct details in productdetails form 
let geteditproductsdetails = async (req, res) => {
    try {
        console.log(req.query);

        let query = await productdetails.findOne({ where: { id: req.query.id, isdeleted: 0 } })
        console.log(query);
        if (query) {
           return res.render('product/editproductdetails',{data:query.dataValues})
            return res.json(response('got edit productdetails', true, query.dataValues))
        } else {
            return res.json(response('something went wrong', false, null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }

}
// ___________________________________________________________update editproducts details in editproductdetails
let updateeditproductsdetails = async (req, res) => {
    try {


        console.log(req.query);
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No files were uploaded.');
        }
        if (req.files) {
            image = await imageupload('product_images/', req.files)
            if (image) {
                data = {
                    color_id: req.body.color_id,
                    banner: req.body.banner,
                    quantity: req.body.quantity,
                    image: image,
                    prod_id: req.query.prod_id
                }
            }
        } else {
            data = {
                color_id: req.body.color_id,
                banner: req.body.banner,
                quantity: req.body.quantity,
                prod_id: req.query.prod_id
            }
        }
        let query = await productdetails.update(data,{where:{id:req.query.id,isdeleted:0}})
       console.log(query);
       if (query[0] === 1) {
           return res.json(response('product details updated',true,null))
       } else {
           return res.json(response('something went wrong',false,null))
       }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }

}

let changeproductstatus = async(req,res)=>{
    try {
        console.log(req.query);
        let query = await products.findOne({where:{prod_id : req.query.id}})
        console.log(query);
        if (query.dataValues.prod_status === 'active') {
            status = 'inactive'
        } else {
            status = 'active'
        }
        let query1 = await products.update({prod_status:status},{where:{prod_id : req.query.id}})
        console.log(query1);
        if (query1[0] === 1) {
            return res.redirect('/products')
        }else{
            return res.json(response('something went wrong',false,null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }
    }

    let changeproductdetailsstatus = async(req,res)=>{
        try {
            console.log(req.query);
        let query = await productdetails.findOne({where:{id : req.query.id}})
        console.log(query);
        if (query.dataValues.banner === 'yes') {
            banner = 'no'
        } else {
            banner = 'yes'
        }
        let query1 = await productdetails.update({banner:banner},{where:{id : req.query.id}})
        console.log(query1);
        if (query1[0] === 1) {
            return res.redirect('/productsdetails?id=1')
        }else{
            return res.json(response('something went wrong',false,null))
        }
            
        } catch (error) {
            console.log(error);
            return response('internal server error',false,null)
        }
    }

module.exports = {
    getproducts, addproducts, getcategoriesdetails,
    deleteproducts, editproducts, updateeditproducts,
    getproductsdetails, deleteproductsdetails, getcolors,
    addproductdetails, geteditproductsdetails, updateeditproductsdetails,
    changeproductstatus, changeproductdetailsstatus

}