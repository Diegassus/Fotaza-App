const validateInputs = require('./validateInputs');
const jwtValidator = require('./jwtValidator');

module.exports = {
    ...validateInputs,
    ...jwtValidator
}