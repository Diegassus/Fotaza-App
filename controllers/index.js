const User = require('./user');
const Auth = require('./auht');



module.exports = {
    ...User,
    ...Auth
}