const db = require('../models/index')
let {offers,categories_master}= db
let response = require('../helper/response')

let pagination = require('../helper/pagination')


// ____________________________________________get offers in offers form 
let getoffer = async(req,res)=>{
try {
    categories_master.hasMany(offers,{foreignKey:'cat_id'})
    offers.belongsTo(categories_master,{foreignKey:'cat_id'})
    let page = pagination(req.params.page)
    let {count,rows} = await offers.findAndCountAll({
        where:{isdeleted:0},
        include:[
            {   attributes:['cat_name'], 
                model:categories_master
            }
        ],
        offset:page.offset,
        limit:10
    })
    if (rows) {
        
        return res.json(response('get offer',true,{count:count,rows:rows,page:page.page}))
    } else {
        return res.json(response('something went wrong',false,null))
    }

} catch (error) {
    console.log(error);
    return res.json(response('internal server error',false,null))
}
} 
// ____________________________________________delete offer from offer form
let deleteoffer = async(req,res)=>{
    try {
        let query = await offers.update({isdeleted:1},{where:{id:req.params.id}})

        if (query) {
            
            return res.redirect('/offers')
        } else {
            
            return res.json(response('something went wrong',false,null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }

}
    
// ______________________________________________add offer
let addoffer = async(req,res)=>{
try {
    console.log(req.body);
    let query = await offers.create(req.body)
    if (query) {
        
        return res.json(response('offer added',true,null))
    } else {
        
        return res.json(response('something went wrong',false,null))
    }
} catch (error) {
    console.log(error);
    return res.json(response('internal server error',false,null))
}    
}
// _______________________________________________get edit offer details
let geteditoffer = async(req,res)=>{
    try {
        
        let query = await offers.findOne({where:{id:req.params.id}})
        if (query) {
            return res.json(response('offer details',true,query))
        } else {
            return res.json(response('something went wrong',false,null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }

}

let updateeditoffer = async(req,res)=>{
    try {
        console.log(req.body);
        let query = await offers.update(req.body,{where:{id:req.params.id}})
        if (query[0] === 1){
            return res.json(response('offer updated',true,null))
        } else {
            return res.json(response('something went wrong',false,null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }
}


module.exports = {getoffer,deleteoffer,addoffer,geteditoffer,updateeditoffer}
