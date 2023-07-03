const User = require('../models/user');
const Profile = require('../models/profile');
const Image = require('../models/image');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const Contact = require('../models/contact');

const socketController = async (socket , io) => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

    socket.on('comentar',async ({id,description,token}) => {
        const {id : idUsuario} = await jwt.verify(token, process.env.SECRET);
        const profile = await User.findByPk(idUsuario);

        const {username , imageSrc} = profile.dataValues;

        const comment = await Comment.create({
            description,status:true,ImageId:id,UserId:idUsuario
        });
        
        // desarrollar logica para guardar comentario
        io.emit('comentario',{comment,username,imagen:comment.ImageId,createdAt:`${comment.createdAt.getDay()}/${comment.createdAt.getMonth()}/${comment.createdAt.getFullYear()}`});
    });

    socket.on('contactar',async ({image,token}) => {//image es el posteo y el token es quien manda la solicitud
        // recuperar la imagen a traves del id (image) y obtener al dueño del posteo
        const imagen = await Image.findByPk(image);
        const destinatario = await User.findByPk(imagen.UserId);
        console.log(destinatario);

        // recuperar al usuario que mando la notificacion
        const {id:idSolicitante} = await jwt.verify(token, process.env.SECRET);
        console.log(idSolicitante)

        // crear registro de la notificacion si no existe
        if(await Contact.findOne({where:{UserId:idSolicitante,ImageId:image}})){
            return
        }

        await Contact.create({
            ImageId:image,
            UserId:idSolicitante,
            status:false
        });
    })
}

module.exports = {
    socketController
}