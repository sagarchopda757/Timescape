let db = require('../models/index')
let { users, address ,order,productdetails,products,color_master} = db
let response = require('../helper/response');

let pagination = require('../helper/pagination')
// _____________________________________________________ get users in users form
let getusers = async (req,res) => {
    try {
        let page = pagination(req.params.page)
        let {count,rows} = await users.findAndCountAll({ 
            where: { isdeleted: 0 } ,
            offset:page.offset,
            limit:10
        })
       // console.log(rows);
        if (rows) {
            return res.render('users/users',{count:count,rows:rows,page:page.page})
            return res.json(response('get users',{count:count,rows:rows,page:page.page}))
        } else {
            return res.json(response('something went wrong', false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// ____________________________________________________delete users from users form
let deleteusers = async (req, res) => {
    try {
        console.log(req.params);
        let query = await users.update({ isdeleted: 1 }, { where: { id: req.params.id } })
        if (query[0] === 1) {
            return res.redirect('/users')
        } else {
            return res.json(response('something went wrong', false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }
}
// _________________________________________________view details of user 
let getuserdetails = async (req, res) => {
    try {
        users.hasMany(address, { foreignKey: 'user_id' })
        address.belongsTo(users, { foreignKey: 'user_id' })

        users.hasMany(order, { foreignKey: 'user_id' })
        order.belongsTo(users,{foreignKey:'user_id'})

        productdetails.hasMany(order, { foreignKey: 'proddet_id' })
        order.belongsTo(productdetails,{foreignKey:'proddet_id'})

        products.hasMany(productdetails,{foreignKey:'prod_id'})
        productdetails.belongsTo(products,{foreignKey:'prod_id'})

        color_master.hasMany(productdetails,{foreignKey:'color_id'})
        productdetails.belongsTo(color_master,{foreignKey:'color_id'})
        
        address.hasMany(order, { foreignKey: 'addr_id' })
        order.belongsTo(address, { foreignKey: 'addr_id' })

        let query = await users.findAll({
            where: { isdeleted: 0, id: req.params.id },
            include: [
                {
                    model: address
                },
                {
                    model:order,
                    include:[
                        {
                            model:address,

                        },
                        {
                            model:productdetails,
                            attributes:['prod_id','color_id'],
                            include:[
                                {
                                    model:products,
                                    attributes:['prod_name']
                                },
                                {
                                    model:color_master,
                                    attributes:['color_code']
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        if (query) {

            return res.json(response('get user details', true, query))
        } else {

            return res.json(response('something went wrong', false, null))
        }

    } catch (error) {
        console.log(error);
        return res.json(response('internal server error', false, null))
    }

}
let changeuserstatus = async(req,res)=>{
    try {
        console.log(req.params);
        let query = await users.findOne({where:{id : req.params.id}})
        console.log(query);
        if (query.dataValues.user_status === 'active') {
            status = 'inactive'
        } else {
            status = 'active'
        }
        let query1 = await users.update({user_status:status},{where:{id : req.params.id}})
        console.log(query1);
        if (query1[0] === 1) {
            return res.redirect('/users')
        }else{
            return res.json(response('something went wrong',false,null))
        }
    } catch (error) {
        console.log(error);
        return res.json(response('internal server error',false,null))
    }
    }
module.exports = {
    getusers, deleteusers, getuserdetails,changeuserstatus
}