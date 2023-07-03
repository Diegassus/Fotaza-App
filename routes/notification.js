const {Router, response} = require('express');
const Contact = require('../models/contact');
const Image = require('../models/image')
const User = require('../models/user')
const { jwtValidator } = require('../middlewares');

const router = Router();

router.get('/',[jwtValidator], async (req, res)=> {
    const notificaciones = await Contact.findAll({
        where:{
            status:false
        }
    });

    const imagenes = []
    for (const notificacion of notificaciones) {
        const imagen = await Image.findByPk(notificacion.ImageId)
        imagenes.push(imagen);
    }

    const images = imagenes.filter(imagen => imagen.UserId == req.user.id);
    const notif = notificaciones.filter(notificacion => images.some(imagen => imagen.id == notificacion.ImageId))

    res.json({
        notificaciones:notif,
        imagenes: images
    });
});

router.get('/:idUser/:idFoto',async(req,res=response)=>{
    const user = await User.findByPk(req.params.idUser);
    const image = await Image.findByPk(req.params.idFoto);
    res.json({
        imagen:image.title,
        usuario:user.username
    })
})

router.post('/:idUser/:idFoto',async(req,res=response)=>{
    await Contact.update({status:true},{where:{UserId:req.params.idUser,ImageId:req.params.idFoto}});
    res.json({
        msg:"Contacto eliminado"
    })
})

module.exports = router;