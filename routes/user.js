const {Router} = require('express');
const {check} = require('express-validator');
const { createUser, updateUser, deleteUser, getUser, getUserToken } = require('../controllers');
const { userExists, usernameExists } = require('../helpers');
const { validateInputs, jwtValidator } = require('../middlewares');
const router = Router();

router.get('/:id',[
    check('id').notEmpty(),
    validateInputs
],getUser);

router.get('/',[
    jwtValidator,
    validateInputs
],getUserToken);

router.post('/',[
    check('username','El nombre de usuario es obligatorio').notEmpty(),
    check('password','La contraseña debe contener minimo 6 caracteres').isLength(6),
    check('email','El correo es obligatorio').isEmail(),
    // check('email').custom(userExists),
    // check('username').custom(usernameExists),
    validateInputs
], createUser);

router.put('/:id',[
    check('id').notEmpty(),
    check('username','El nombre de usuario es obligatorio').notEmpty(),
    check('password','La contraseña debe contener minimo 6 caracteres').isLength(6),
    validateInputs
], updateUser);

router.delete('/:id',[
    jwtValidator,
    check('id').notEmpty(),
    validateInputs
],deleteUser);



module.exports = router ;