module.exports = async function imageupload(path,req) {
    

    let sampleFile;
    let uploadPath;

    

    if (req) {
        let time = Date.now()
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        
        sampleFile = req.image;
        uploadPath = __dirname + '/../public/images/'+path + time + '_' + sampleFile.name;

        // Use the mv() method to place the file somewhere on your server
       await sampleFile.mv(uploadPath, function (err) {
            if (err)
                return err

        });
        return time + '_' + sampleFile.name
    }
}