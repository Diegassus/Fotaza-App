
const { User } = require('../models');


const userExists = async ( email ) => {
    const user = await User.findOne({where:{email:email}});
    if(user){
        throw new Error('El correo electronico ya se encuentra vinculado a una cuenta');
    }
}

const usernameExists = async (username) =>{
    const user = await User.findOne({where:{username}});
    if(user){
        throw new Error('El nombre de usuario ya existe');
    }
}


module.exports = {
    userExists,
    usernameExists
}