const { v4 : uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const upload = (files,valid = ['png','jpg','jpeg','webp'], folder = '') => {
    
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

const deleteFile= (file) => {
    if(file.includes('base')|| file.includes('portada')){
        return;
    }
    try{
        const borrar = path.join(__dirname,'../uploads',file);
        fs.unlink(borrar,(e)=>{
            console.log(e)
        });
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    upload,
    deleteFile
}