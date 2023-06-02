let response = require('../helper/response')
let loginhelper = require('../helper/loginhelper').login
let sendmail = require('../helper/sendmail').sendmail
var jwt = require('jsonwebtoken');
let db = require('../models/index');
const md5 = require('md5');
let {users,admin}=db 
// __________________________________________________admin login
let login = async (req, res) => {
  console.log(req.body);
  let result = await loginhelper(req.body)
  console.log(result);

  if (result.sts === true) {
    req.session.status = true
    req.session.msg = result.msg
    return res.redirect('/admin')
  } else {
    req.session.msg = result.msg
    return res.redirect('/login')
  }
}
//________________________________________________logout
let logout = async (req, res) => {
  try {
    req.session.destroy()
    return res.redirect('/login')
  } catch (error) {
    return res.json(response('internal server error'))
  }
}

// ____________________________________________forgot password
let forgotpassword = async (req, res) => {
  try {
    console.log(req.body);
    var auth_token = jwt.sign({ email:req.body.email }, process.env.secret_key);
    data={
      to:req.body.email,
      subject:` Timescape Reset Password`,
      html :`<b>this is reset password link from timescape</b><br>
    <a href='http://localhost:3001/recoverpassword/${auth_token}'>click here to reset</a>`
    }
    
    let redirect = await sendmail(data)
    if (redirect) {
      req.session.response =response('mail sent to reset password',true,null)
      return res.redirect('/forgotpassword')
    } else {
      return res.json(response('something went wrong',false,null))
    }
  } catch (error) {
    console.log(error);
    return res.json(response('internal server error', false, null))
  }
}
// ____________________________________________recover password
let recoverpassword = async (req, res) => {
  try {
    password = md5(req.body.password)
    var decoded = jwt.verify(req.params.token, process.env.secret_key);
    let query = await admin.update({password:password},{where:{email:decoded.email}})
    if (query[0] === 1) {
      req.session.response =response('password reset successfully',true,null)
      return res.redirect('/login')
    } else {
      return res.json(response('something went wrong',false,null))
    }
  } catch (error) {
    console.log(error);
    return res.json(response('internal server error',false,null))
  }
}
module.exports = { login, logout, forgotpassword, recoverpassword }