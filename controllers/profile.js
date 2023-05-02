const { Profile, User } = require("../models");



const getProfile = async (req , res = response) => {
    const {id} = req.params;
    const profile = await Profile.findOne({where:{UserId:id}});
    res.render('profile',{
        profile
    });
}


const getEdit = async(req,res = response)=>{
    const {id} = req.params;
    const profile = await Profile.findOne({where:{UserId:id}});
    res.render('profileEdit',{
        profile
    });
}

const updateProfile = async (req, res = response) => { 
    try{
        const id = req.uid;
        const {likes,lastname,birth} = req.body;

        const data = {
            likes,
            lastname,
            birth
        }

        const result = await Profile.update(data,{where:{UserId : id}}); 

        if(result>0){
            res.json({
                msg:'se actualizo',
                result
            });
        }else{
            res.json({
                msg:'No se pudo actualizar el perfil'
            }); 
        }

    }catch(e){

        res.status(400).json({
            msg:e.message
        });

    }
}


module.exports = {
    getProfile,
    updateProfile,
    getEdit
}