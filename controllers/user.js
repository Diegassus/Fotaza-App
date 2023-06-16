const { response } = require("express");
const { crypt } = require("../helpers");
const { User, Profile } = require('../models');



const createUser = async ( req , res = response ) => {
    const {email,username,password} = req.body ;

    const userDb = await User.findOne({where:{email}});
    const userDb2 = await User.findOne({where:{username}});
    if(userDb || userDb2){
        return res.status(400).json({
            msg:'Ya existe esta cuenta'
        })
    }
    const pass = crypt(password);
    const user = await User.create({username,email,password:pass});
    const profile = await Profile.create();
    await user.setProfile(profile);
    await profile.setUser(user);

    res.json({
        msg:'Usuario creado con exito'
    });
}

const updateUser = async ( req , res = response ) => {
    const {id} = req.params ;
    const {username , password} = req.body ;
    const hash = crypt(password);
    try{
        await User.update({username,password:hash},{where:{id:id,status:true}});
        const user = await User.findByPk(id);

        res.json({
            msg:'Se actualizo con exito al usuario',
            user
        });
    }catch(e){
        res.status(400).json({
            msg:'No se pudo actualizar el usuario debido a que no existe'
        })
    }
    
}

const deleteUser = async ( req , res = response ) => {
    const {id} = req.params;
    await User.update({status:false},{where:{id:id}});
    const user = await User.findByPk(id);
    res.json({
        msg:"Se elimino al usuario con exito",
        user
    });
}

const getUser = async (req , res = response ) => {
    const {id} = req.params;
    const user = await User.findByPk(id,{where:{status:true}});
    res.json({
        user
    });
}

const getUserToken = async (req, res = response)=>{
    res.json({
        user:req.user.id
    });
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUserToken
}