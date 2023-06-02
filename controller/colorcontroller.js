let response = require('../helper/response')
const db = require('../models/index')
let {color_master} = db
let pagination = require('../helper/pagination')


let getcolor = async(req,res)=>{
    try {
        console.log('query param',req.query);
        console.log('sort',req.query.sort);
       
        sort1 = []
        if (req.query.sort !== undefined && req.query.sort !== '') {
            sort1.push([req.query.sort,req.query.order])
        }
        console.log('sort1',sort1);
        let page =await pagination(req.query.page)

        console.log('page',page);
        let {count,rows} = await color_master.findAndCountAll({
            where:{isdeleted:0},
            order:sort1,
            offset:page.offset,
            limit:10 
            })
     
        if (rows) {
            return res.json(response('get color',true,{count:count,rows:rows,page:page.page}))
        } else {
            return res.json(response('Something went wrong',false,null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }

}

let deletecolor = async(req,res)=>{
    try {
      let query = await color_master.update({isdeleted:1},{where:{color_id: req.params.id}})  
      if (query[0]===1) {
          return res.redirect('/color')
      } else {
          return res.json(response('Somethimg went wrong',false,null))
      }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }
}

let addcolor = async(req,res)=>{
    try {
        data =req.body.color_code
        console.log(data);

        let query = await color_master.create({color_code:data})  
      if (query) {
          return res.json(response('color added',true,null))
      } else {
          return res.json(response('Somethimg went wrong',false,null))
      }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }
}
module.exports ={getcolor,deletecolor,addcolor}