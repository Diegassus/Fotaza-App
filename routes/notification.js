const {Router} = require('express');
const Contact = require('../models/contact');
const Image = require('../models/image')
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

module.exports = router;