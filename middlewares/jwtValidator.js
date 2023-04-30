const { response } = require("express");
const jwt = require('jsonwebtoken');
const { User } = require("../models");


const jwtValidator = async ( req, res = response, next) => {

    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({
            msg:"Acceso no autorizado"
        });
    }

    try{
        const {id} = jwt.verify(token, process.env.SECRET);
        const user = await User.findByPk(id);

        if(!user){
            return res.status(401).json({
                msg:'token no valido'
            });
        }

        if(!user.status){
            return res.status(401).json({
                msg:'El usuario con el que se quiere proceder, fue eliminado'
            });
        }
        req.user = user ;
        req.uid = id ;

        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            msg:'Token invalido'
        })
    }
}

module.exports = {
    jwtValidator
}