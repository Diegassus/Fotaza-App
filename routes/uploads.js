const {Router} = require('express');
const { validateFile, validateInputs, jwtValidator } = require('../middlewares');
const { uploadFile, getImage } = require('../controllers');
const Path = require('path')

const router = Router();

router.post('/:id',[validateFile,validateInputs],uploadFile);

router.get('/:type/:id/:prof',getImage);

router.get('/image/:path',(req,res)=>{
    const pathImage = Path.join(__dirname,'../uploads',req.params.path);
    res.sendFile(pathImage);
})


module.exports = router ;