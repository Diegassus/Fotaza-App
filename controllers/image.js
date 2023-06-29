const { response } = require("express");
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const {Category,Right,Image, Like} = require('../models');
const { v4 : uuidv4 } = require('uuid');
const path = require('path');
const { Op } = require("sequelize");
const sequelize = require("../db/config");


const postImage = async (req,res = response)=>{ // manejar el post a la DB
    const valid = ['png','jpg','jpeg','webp']
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
                return reject(err + 'hola');
            }
        });

        // tomar resolucion
        let resolution;
        await sharp(uploadPath).metadata().then(metadata => {
            resolution = `${metadata.width}x${metadata.height}`
        }).catch(err => {
            resolution = '0x0'
            console.log(err)
        });
        // validar la privacidad
        let privacy
        if(type || RightId == 1 ){
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
        console.log('90')
        // posteo
        const response = await Image.create(data);
        res.redirect('/');
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
    // const like = await Like.findAll({
    //     where:{
    //         ImageId:response.map(element => element.id),
    //         UserId:req.user.id
    //     }
    // });

    // const likes = {}

    // like.forEach(element => {
    //     likes[element.ImageId] = element.stars;
    // });

    res.json({
        response
    });
}

const deleteImage = async (req,res = response)=>{
    const {id} = req.params;
    await Image.destroy({
        where:{
            id:id
        }
    });
    res.json({
        usuario:req.user.id
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

const portadaImagenes = async (req,res = response)=>{
    // recuperar todas las imagenes con un promedio de 4 estrellas
    const images = await Image.findAll({
        where:{
            stars: {
                [Op.gte]: 4
            }
        },
        order: [['createdAt', 'DESC']]
    });

    // buscar aquellas que tengan mas de 50 valoraciones entre esas recuperadas
    const masValoradas = [];
    const usuarios = new Set();
    for (const image of images) {
        const query = `
            SELECT COUNT(*) AS Likes
            FROM likes
            WHERE ImageId = ${image.id}
            `;
        const result = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
        const likes = result[0].Likes;
        if(likes >= 2){
            // filtrar que no sean del mismo usuario
            if(!usuarios.has(image.UserId)){
                masValoradas.push(image);
                usuarios.add(image.UserId);
            }
        }
    }

    // filtrar que sean menores a un año de antiguedad
    const filtradas = masValoradas.filter(image=>{
        return image.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24 * 365);
    })

    res.json({
        images: filtradas
    })
}

module.exports = {
    postImage,
    getAll,
    getPublic,
    getUserImage,
    getTagPublic,
    getTagAuth,
    getCatAuth,
    deleteImage,
    portadaImagenes
}