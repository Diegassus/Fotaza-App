const {upload} = require('../helpers');
const { Profile } = require('../models');
const fs = require('fs')
const Path = require('path');

const uploadFile = async (req, res = response)=>{
    try{
        const {imageSrc} = req.files;
        const path = await upload(req.files);
        let result;
        if(imageSrc){
            result = await Profile.update({imageSrc:path},{where:{id:req.params.id}});

        }else{
            result = await Profile.update({portrait:path},{where:{id:req.params.id}});
        }
        res.redirect('/profile/'+req.params.id);
    }catch(e){
        res.status(400).json({
            msg:"Ocurrio un error"
        });
    }
}

const getImage = async (req, res = response)=>{
    
    const {id,type,prof} = req.params;
    const profile = await Profile.findOne({where:{UserId:prof}});
    let image;
    switch(type){
        case 'portrait':
            if(!profile.portrait){
                return res.status(400).json({
                    msg:'No existe imagen para el perfil'
                });
            }
            image = profile.portrait;
            break;
        case 'imageSrc':
            if(!profile.imageSrc){
                return res.status(400).json({
                    msg:'No existe imagen para el perfil'
                });
            }
            image = profile.imageSrc;
            break;
        default:
            return res.status(500).json({
                msg:"tipo no validado"
            });
    }

    const pathImage = Path.join(__dirname,'../uploads',image);
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