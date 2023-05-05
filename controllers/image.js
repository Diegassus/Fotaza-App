const { response } = require("express");
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const {Category,Right,Image, Like} = require('../models');
const { v4 : uuidv4 } = require('uuid');
const path = require('path');
const { Op } = require("sequelize");


const postImage = async (req,res = response)=>{ // manejar el post a la DB
    try{
        const valid = ['png','jpg','jpeg']
        const {title,description,CategoryId,RightId,watermark,type,tags,token} = req.body;
        const {src} = req.files;

        const {id} = jwt.verify(token, process.env.SECRET);

        // subir y mover la foto
        const shortName = src.name.split('.');
        const extension = shortName[shortName.length - 1];
        if(!valid.includes(extension)){
            return reject('Extension no valida');
        }
        const temporalName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname,'../uploads',temporalName);
        src.mv(uploadPath, (err) => {
            if(err){
                return reject(err);
            }
        });

        // tomar resolucion
        let resolution;
        await sharp(uploadPath).metadata().then(metadata => {
            resolution = `${metadata.width}x${metadata.height}`
        });

        // validar la privacidad
        let privacy
        if(type || RightId == 4 ){
            privacy = true;
        }else{
            privacy = false;
        }

        // marca de agua
        if(watermark == "" || watermark == null){
            watermartk = "Fotaza";
        }else{
            watermartk = watermark
        }
        
        // validar categoria
        const cats = await Category.findByPk(CategoryId);
        if(!cats && CategoryId!==1){
            res.status(400).json({
                msg:'La categoria no existe'
            });
        }

        // validar derechos
        const der = await Right.findByPk(RightId);
        if(!der){
            res.status(400).json({
                msg:'No es un tipo de derecho valido'
            });
        }

        // datos para el post
        const data = {
            resolution,
            title,
            description,
            type:privacy,
            format:extension,
            watermartk,
            tags,
            src:temporalName,
            status:true,
            UserId:id,
            CategoryId,
            RightId
        }

        // posteo
        const response = await Image.create(data);
        res.redirect('/');
    }catch(error){
        res.status(500).json({
            error
        })
    }
}

const getPublic = async (req,res = response)=>{
    const response = await Image.findAll({
        where:{
            type:false
        },
        order: [
            ['createdAt', 'DESC']
          ]
    });
    res.json({
        response
    });
}

const getAll = async (req,res = response)=>{
    const response = await Image.findAll({
        order: [
            ['createdAt', 'DESC']
          ]
    });
    const like = await Like.findAll({
        where:{
            ImageId:response.map(element => element.id),
            UserId:req.user.id
        }
    });

    const likes = {}

    like.forEach(element => {
        likes[element.ImageId] = element.stars;
    });

    res.json({
        response,
        likes
    });
}

const getUserImage = async (req,res=response)=>{
    const {idProfile} = req.params;
    const images = await Image.findAll({
        where:{
            UserId:idProfile
        }
    });
    res.json({
        images
    })
}

const getTagPublic = async (req,res = response)=>{
    const {tag} = req.params
    const response = await Image.findAll({
        where:{
            tags:{
                [Op.like]:`%${tag}%`
            },
            type:false
        }
    });
    res.json({
        response
    })
}

const getTagAuth = async (req,res = response)=>{
    const {tag} = req.params
    const response = await Image.findAll({
        where:{
            tags:{
                [Op.like]:`%${tag}%`
            }
        }
    });
    const like = await Like.findAll({
        where:{
            ImageId:response.map(element => element.id),
            UserId:req.user.id
        }
    });

    const likes = {}

    like.forEach(element => {
        likes[element.ImageId] = element.stars;
    });

    res.json({
        response,
        likes
    });
}

const getCatAuth = async (req,res = response)=>{
    const {category} = req.params

    const cat = await Category.findOne({
        where:{
            name:category
        }
    });

    const response = await Image.findAll({
        where:{
            CategoryId:cat.id
        }
    });
    
    const like = await Like.findAll({
        where:{
            ImageId:response.map(element => element.id),
            UserId:req.user.id
        }
    });

    const likes = {}

    like.forEach(element => {
        likes[element.ImageId] = element.stars;
    });

    res.json({
        response,
        likes
    });
}

module.exports = {
    postImage,
    getAll,
    getPublic,
    getUserImage,
    getTagPublic,
    getTagAuth,
    getCatAuth
}