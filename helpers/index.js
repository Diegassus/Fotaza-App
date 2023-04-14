const createPassword = require('./createPassword');
const dbValidators = require('./dbValidators');
const generateJWT = require('./generateJWT');
const getUserFromToken = require('./getUserFromToken');


module.exports = {
    ...createPassword,
    ...dbValidators,
    ...generateJWT,
    ...getUserFromToken
}