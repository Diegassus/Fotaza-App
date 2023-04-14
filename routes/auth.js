const {Router} = require('express');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validateInputs');
const { login, renewToken } = require('../controllers');
const { jwtValidator } = require('../middlewares');
const router = Router();

router.post('/login',[
    check('email','El correo no es un correo valido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateInputs
],login);

router.get('/',jwtValidator,renewToken);


module.exports = router ;