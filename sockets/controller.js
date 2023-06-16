const User = require('../models/user');
const Profile = require('../models/profile');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

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
        io.emit('comentario',{comment,username,imageSrc});
    });
}

module.exports = {
    socketController
}