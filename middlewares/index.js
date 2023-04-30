const validateInputs = require('./validateInputs');
const jwtValidator = require('./jwtValidator');
const validateFile = require('./validateFile');

module.exports = {
    ...validateInputs,
    ...jwtValidator,
    ...validateFile
}