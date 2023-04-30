const {Router} = require('express');
const {validateFile,jwtValidator} = require('../middlewares');
const { postImage, getPublic, getAll } = require('../controllers');
const router = Router();



router.post('/:id',validateFile,postImage); // desarrollar logica para publicar una imagen

router.get('/auth',[jwtValidator],getAll);

router.get('/',getPublic);



module.exports = router ;
