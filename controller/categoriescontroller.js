
let db = require('../models/index')
let categories_master = db.categories_master
 const Op = db.Op
let response= require('../helper/response')
let imageupload = require('../helper/imageupload')
let pagination = require('../helper/pagination')


// ______________________________________________get all categories details
let getcategories = async (req, res) => {

    try {
        
        console.log('req.query ',req.query);
        let search={}
        if (req.query.searchfield) {
            search={
                cat_isdeleted: 0,
                cat_name:{ [Op.startsWith]: `${req.query.searchfield}`}
            }
        } else {
            search={
                cat_isdeleted: 0,
             
            }
        }
        console.log(search);
        let page =await pagination(req.query.page)
        let {count ,rows} = await categories_master.findAndCountAll({ 
            where:search,
            offset:page.offset,
            limit:10,
             
        })
        if (rows) {  
           // console.log(page);
           // console.log(rows);

            return res.render('category/categories',{count:count,rows:rows,page:page.page})
           // return res.json(response("categories details", true,{count:count,rows:rows,page:page.page}))
        } else {
            return res.json(response('something went wrong',false,null)) 
        }
    } catch (error) {
        console.log(error);
        return res.json(response("internal server error", false, null))
    }
}
// ____________________________________________add categories
let addcategories = async (req, res) => {
    console.log("addcategory", req.body);

    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No files were uploaded.');
            }
            if (req.files) {
                image = await imageupload('categories_images/', req.files)
                if (image) {
                    adddata = {
                        cat_name: req.body.categoryname,
                        cat_image: image,
                        cat_status: req.body.categorystatus,
                    }
                }
            }        
        let query = await categories_master.create(adddata)
        if (query) {
            return res.json(response("cateory added successfully", true, null))
        } else {
            return res.json(response("something went wrong", false, null))

        }
    } catch (error) {
        console.log(error);
        return res.json(response("something went wrong", false, null))

    }
}

// _________________________________________________________delete categories
let deletecategories = async (req, res) => {
    try {
         console.log(req.query);
        id = req.query.id
        let query = await categories_master.update({ cat_isdeleted: "1" }, { where: { id: id } })

        console.log(query);
        if (query[0] === 1) {
            return res.redirect('/categories')
            return res.json(response("deleted successfully", true, null))
        } else {
            return res.json(response("something went wrong", false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response("something went wrong", false, null))
    }
}
// ________________________________________________get categories info in edit categories page
let editcategories = async (req, res) => {
    try {
        // console.log(req.params);
        let query = await categories_master.findOne({ where: { id: req.query.id } })
        console.log('query>>>>>>>>>>>>>>>>>>>>>>>',query);
        if (query) {
            return res.render('category/editcategories',{data:query})
            return res.json(response('edit user data', true, query.dataValues))

        } else {
            return res.json(response('something went wrong', false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('something went wrong', false, null))
    }
}
// _______________________________________________________update info from edit categories page
let updateeditcategories = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No files were uploaded.');
            }
            if (req.files) {
                image = await imageupload('categories_images/', req.files)
                if (image) {
                    editdata = {
                        cat_name: req.body.categoryname,
                        cat_image: image,
                        
                    }
                }
            }else{
                editdata = {
                    cat_name: req.body.categoryname,
                   
                }  
            }     
      
        console.log('edit data >>>>>>>>>>>',editdata);
        id = req.params.id
        console.log(id);
        let query = await categories_master.update(editdata, { where: { id: id ,cat_isdeleted:"0"} })
        console.log('query',query);
        if (query[0] === 1) {
            
            return res.json(response("updated successfully", true, null))
           
        } else {
            return res.json(response("something went wrong", false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('something went wrong',false,null))
    }

}

let changecategorystatus = async(req,res)=>{
try {
    console.log(req.params);
    let query = await categories_master.findOne({where:{id : req.params.id}})
    console.log(query);
    if (query.dataValues.cat_status === 'active') {
        status = 'inactive'
    } else {
        status = 'active'
    }
    let query1 = await categories_master.update({cat_status:status},{where:{id : req.params.id}})
    console.log(query1);
    if (query1[0] === 1) {
        return res.redirect('/categories')
    }else{
        return res.json(response('something went wrong',false,null))
    }
} catch (error) {
    console.log(error);
    return res.json(response('internal server error',false,null))
}
}

module.exports = { getcategories, addcategories, deletecategories, editcategories, updateeditcategories,changecategorystatus }