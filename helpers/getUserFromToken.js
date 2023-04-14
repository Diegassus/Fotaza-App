const jwt = require('jsonwebtoken');
const { User } = require('../models');

const getUserFromToken = (token)=>{
    return new Promise((res,rej)=>{
        const {id} = jwt.verify(token, process.env.SECRET);
        const user = User.findByPk(id);

        if(!user){
            rej("token no valido");
        }else if(user.status === 0){
            rej("Usuario eliminado");
        }else{
            res(user);
        }
    })
    
}

module.exports = {
    getUserFromToken
}