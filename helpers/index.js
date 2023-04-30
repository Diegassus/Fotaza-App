const createPassword = require('./createPassword');
const dbValidators = require('./dbValidators');
const generateJWT = require('./generateJWT');
const getUserFromToken = require('./getUserFromToken');
const upload= require('./upload');


module.exports = {
    ...createPassword,
    ...dbValidators,
    ...generateJWT,
    ...getUserFromToken,
    ...upload
}