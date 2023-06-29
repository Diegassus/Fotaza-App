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
        profile: profile
    });
}

const updateProfile = async (req, res = response) => { 
    const id = req.uid;
    const {likes,lastname,birth} = req.body;
    const profile = await Profile.findOne({where:{UserId:id}});
    try{
        let result;

        if(likes.length != 0){
            result = await Profile.update({likes},{where:{UserId : id}});
        }

        if(lastname.length != 0){
            result = await Profile.update({lastname},{where:{UserId : id}}); 
        }

        if(Date.parse(birth)){
            result = await Profile.update({birth},{where:{UserId : id}}); 
        }
        
        if(result>0){
            res.render('profileEdit',{
                msg:'se actualizo correctamente',
                profile,
                result
            });
        }else{
            throw new Error('No se pudo actualizar');
        }

    }catch(e){
        res.render('profileEdit',{
            msg:e,
            profile
        });
    }
}


module.exports = {
    getProfile,
    updateProfile,
    getEdit
}