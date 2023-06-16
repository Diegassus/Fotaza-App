const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = ( id = '' ) => {
    return new Promise((res,rej)=>{
        const payload = {id};

        jwt.sign(payload,process.env.SECRET,{
            expiresIn:'12h'
        },(err,token)=>{
            if(err){
                console.log(e);
                rej('No se pudo generar el token');
            }else{
                res(token);
            }
        });
    });
}

const comprobarJWT = async (token = '') => {
    try{
        if(token.length == 0){
            return null
        }

        const {id} = await jwt.verify(token,process.env.SECRET);
        const user = await User.findByPk(id);

        if(user){
            if(user.status){
                return user
            }
        }

        return null
    }catch(e){
        return null
    }
}

module.exports = {
    generateJWT,
    comprobarJWT
}