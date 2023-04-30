const { v4 : uuidv4 } = require('uuid');
const path = require('path');

const upload = (files,valid = ['png','jpg','jpeg'], folder = '') => {
    
    return new Promise((resolve, reject) => {
        const {imageSrc,portrait} = files;

        let shortName;
        if(imageSrc){
            shortName = imageSrc.name.split('.');
        }else{
            shortName = portrait.name.split('.');
        }
        const extension = shortName[shortName.length - 1];
        if(!valid.includes(extension)){
            return reject('Extension no valida');
        }
        
        const temporalName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname,'../uploads',folder,temporalName);
        if(imageSrc){
            imageSrc.mv(uploadPath, (err) => {
                if(err){
                    return reject(err);
                }
            });
        }else{
            portrait.mv(uploadPath, (err) => {
                if(err){
                    return reject(err);
                }
            });
        }
        console.log(temporalName)
        resolve(temporalName);
    })
}

module.exports = {
    upload
}