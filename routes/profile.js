const {Router} = require('express');
const { jwtValidator, validateInputs} = require('../middlewares');
const { getProfile, updateProfile, getEdit, getProf } = require('../controllers');
const { check } = require('express-validator');
const router = Router();

router.get('/:id',[validateInputs],getProfile); // revisar middlewares

router.get('/edit/:id',getEdit);

router.post('/',[jwtValidator,
    check('lastname','El nombre es obligatorio').not().isEmpty(),
    check('birth','La fecha es obligatoria').not().isEmpty(),
    check('likes','La biografia es obligatoria').not().isEmpty()
    ,validateInputs],updateProfile)  // revisar middlewares 




module.exports = router ;