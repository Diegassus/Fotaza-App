const {Router} = require('express');
const { jwtValidator, validateInputs} = require('../middlewares');
const { getProfile, updateProfile, getEdit, getProf } = require('../controllers');
const { check } = require('express-validator');
const router = Router();

router.get('/:id',[validateInputs],getProfile); // revisar middlewares

router.get('/edit/:id',getEdit);

router.post('/',[jwtValidator,validateInputs],updateProfile)  // revisar middlewares 




module.exports = router ;