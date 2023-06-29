const {Router} = require('express');
const {validateFile,jwtValidator} = require('../middlewares');
const { postImage, getPublic, getAll, getUserImage, getTagPublic, getTagAuth, getCatAuth, deleteImage, portadaImagenes } = require('../controllers');
const router = Router();



router.post('/',validateFile,postImage); // desarrollar logica para publicar una imagen

router.get('/portada',portadaImagenes);

router.get('/auth',[jwtValidator],getAll);

router.get('/',getPublic);

router.get('/:idProfile',getUserImage)

router.get('/tag/:tag',getTagPublic);

router.get('/tagAuth/:tag',[jwtValidator],getTagAuth);

router.get('/cat/:category',[jwtValidator],getCatAuth);

router.delete('/:id',[jwtValidator],deleteImage);


module.exports = router ;
