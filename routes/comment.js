const {Router, response} = require('express');
const { getComments } = require('../controllers/comment');
const router = Router();

router.get('/:id', getComments);

module.exports = router