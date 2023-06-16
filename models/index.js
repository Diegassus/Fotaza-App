const Server = require('./server');
const User = require('./user');
const Profile = require('./profile');
const Image = require('./image');
const Like = require('./like');
const Contact = require('./contact');
const Comment = require('./comment');
const Right = require('./right');
const Category = require('./category');

User.hasOne(Profile,{as:'Profile',foreignKey:'UserId'});  // Usuario tiene un perfil
Profile.hasOne(User,{as:'User',foreignKey:'ProfileId'});  // Perfil tiene un usuario

User.hasMany(Image,{as:'User',foreignKey:'UserId'});  // Usuario tiene muchas imagenes
Image.belongsTo(User,{as:'User'});  // Imagen pertenece a un usuario

Image.belongsToMany(User,{through:Like}); // Imagen tiene muchos likes
User.belongsToMany(Image,{through:Like}); // Usuario da muchos likes

User.belongsToMany(Image,{through:Contact}); // Usuario contacta a muchas publicaciones
Image.belongsToMany(User,{through:Contact}); // Imagen es contactada por muchos usuarios

// User.belongsToMany(Image,{through:Comment});  // Usuario comenta muchas imagenes
// Image.belongsToMany(User,{through:Comment});  // Imagen tiene muchos comentarios  

Category.hasMany(Image,{as:'Category',foreignKey:'CategoryId'}); // muchas imagenes se asocian a una categoria
Image.belongsTo(Category,{as:'Category'}); // Imagen pertnece a una categoria

Right.hasMany(Image,{as:'Right',foreignKey:'RightId'}); // derechos pertenecesn a muchas imagenes
Image.belongsTo(Right,{as:'Right'}); // una imagen tiene un derecho

module.exports = {
    Server,
    User,
    Profile,
    Image,
    Right,
    Category,
    Like
}