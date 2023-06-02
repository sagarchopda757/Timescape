const nodemailer = require("nodemailer");
async function sendmail(data){

    
    let Mail = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'sagarc.spaceo@gmail.com', // generated ethereal user
            pass: 'hiagjhlfjnclztwq', // generated ethereal password   hiagjhlfjnclztwq
        },
    })
    
    let getstatus =await Mail.sendMail({
        from: '"sagarchopda" <sagarc.spaceo@gmail.com>',
        to: data.to,
        subject: data.subject,
        html: data.html
    });
    return getstatus
}
    
module.exports={sendmail}
