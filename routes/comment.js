const {Router, response} = require('express');
const { getComments, deleteComment,getComment } = require('../controllers/comment');
const { jwtValidator } = require('../middlewares');
const router = Router();

router.get('/:id', [jwtValidator],getComments);

router.get('/:id/live', [jwtValidator],getComment);

router.delete('/:id', deleteComment);

module.exports = router