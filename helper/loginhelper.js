let db = require('../models/index')
let admin =db.admin
let response= require('./response')
let md5 = require('md5')

let login = async (data)=>{

    try {
        let query = await admin.findOne({where:{email:data.email}})
        console.log(query);
        console.log(md5(data.password));
        if (query) {
            if (data.email == query.dataValues.email && md5(data.password) == query.dataValues.password) {
                
                
                return response('login successful',true,null)
            } else{
                
                return response('invalid crediantials',false,null)
            }
        }else{
            return response('User Does not Exist',false,null)
        }
    } catch (error) {
        console.log(error);
        return response('Something went wrong',false,null)
    }
}

module.exports = {login}