const { response } = require("express");
const {Like,Image} = require("../models");




const giveLike = async (req,res = response)=>{
    const {star,posteo} = req.body; // star es el numero de like y posteo el id del image
    const {id} = req.user // id del usuario q dio like
    try {
        const like = await Like.findOne({
            where:{
                UserId:id,
                ImageId:posteo
            }
        });
        // si el like existe y el valor de estrella es otro, lo actualizamos
        if(!like){
            await Like.create({
                stars:star,
                UserId:id,
                ImageId:posteo
            })
        }else{
            if(like.stars != star){
                await like.update({
                    stars:star
                },{
                    where:{
                        UserId:id,
                        ImageId:posteo
                    }
                })
            }
        }

        // retornar TODOS los likes de ese post
        const likes = await Like.findAll({
            where:{
                ImageId:posteo
            }
        });

        // calcular el promedio y setearlo a la imagen
        const promedio = likes.length == 0 ? 0 : likes.reduce((a,b)=>a+b.stars,0)/likes.length

        await Image.update({
            stars : promedio
        },{
            where:{
                id:posteo
            }
        })

        return res.json({
            promedio
        })
    
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    giveLike
}