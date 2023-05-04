const {Router} = require('express');
const { jwtValidator } = require('../middlewares');
const { giveLike } = require('../controllers');
const router = Router();

router.post('/',[jwtValidator],giveLike);



module.exports = router;