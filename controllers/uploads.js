const {upload,deleteFile} = require('../helpers');
const { Profile } = require('../models');
const fs = require('fs')
const Path = require('path');

const uploadFile = async (req, res = response)=>{
    try{
        const {imageSrc} = req.files;
        const profile = await Profile.findOne({where:{id:req.params.id}});
        if(imageSrc){
            deleteFile(profile.imageSrc);
        }else{
            deleteFile(profile.portrait);
        }
        const path = await upload(req.files);
        let result;
        if(imageSrc){
            result = await Profile.update({imageSrc:path},{where:{id:req.params.id}});
        }else{
            result = await Profile.update({portrait:path},{where:{id:req.params.id}});
        }
        res.redirect('/profile/'+req.params.id);
    }catch(e){
        console.log(e)
        res.status(400).json({
            msg:"Ocurrio un error"
        });
    }
}

const getImage = async (req, res = response)=>{
    let pathImage;
    const {id,type,prof} = req.params;
    const profile = await Profile.findOne({where:{UserId:prof}});
    let image;
    switch(type){
        case 'portrait':
            image = profile.portrait;
            if(profile.portrait == 'portada.jpg'){
                pathImage = Path.join(__dirname,'../public/assets',image);
                res.sendFile(pathImage);
                return;
            }
            break;
        case 'imageSrc':
            image = profile.imageSrc;
            if(profile.imageSrc == 'base.png'){
                pathImage = Path.join(__dirname,'../public/assets',image);
                res.sendFile(pathImage);
                return
            }
            break;
        default:
            return res.status(500).json({
                msg:"tipo no validado"
            });
    }

    pathImage = Path.join(__dirname,'../uploads',image);
    if(fs.existsSync(pathImage)){
        res.sendFile(pathImage);
    }else{
        res.json({
            msg:"No existe imagen"
        })
    }
    
}

module.exports = {
    uploadFile,
    getImage
}