const { response } = require("express");
const { User } = require("../models");
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers");


const login = async (req , res = response)=>{
    const {email , password} = req.body;

    try{
        const user = await User.findOne({where:{email}});

        if(!user){
            return res.status(400).json({
                msg:'El correo es incorrecto'
            });
        }
    

        if(!user.status){
            return res.status(400).json({
                msg:'La cuenta a la cual intenta acceder esta bloqueada o fue eliminada'
            });
        }

        const passValid = bcrypt.compareSync(password, user.password);

        if(!passValid){
            return res.status(400).json({
                msg:'Contraseña incorrecta'
            });
        }

        // Generar tokenp or inicio de sesion
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch(error){
        return  res.status(500).json({
            msg:'Algo salio mal en el login',
            error
        })
    }
}

const renewToken = async (req , res = response) => {
    const {user} = req ;
    const token = await generateJWT(user.id);

    res.json({
        user,
        token
    });
}

module.exports = {
    login,
    renewToken
}