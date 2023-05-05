const {Router} = require('express');
const {validateFile,jwtValidator} = require('../middlewares');
const { postImage, getPublic, getAll, getUserImage, getTagPublic, getTagAuth, getCatAuth } = require('../controllers');
const router = Router();



router.post('/:id',validateFile,postImage); // desarrollar logica para publicar una imagen

router.get('/auth',[jwtValidator],getAll);

router.get('/',getPublic);

router.get('/:idProfile',getUserImage)

router.get('/tag/:tag',getTagPublic);

router.get('/tagAuth/:tag',[jwtValidator],getTagAuth);

router.get('/cat/:category',[jwtValidator],getCatAuth)


module.exports = router ;
