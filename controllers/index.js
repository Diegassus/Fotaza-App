const User = require('./user');
const Auth = require('./auht');
const Profile = require('./profile');
const Upload = require('./uploads');
const Image = require('./image');
const Stars = require('./stars');


module.exports = {
    ...User,
    ...Auth,
    ...Profile,
    ...Upload,
    ...Image,
    ...Stars
}