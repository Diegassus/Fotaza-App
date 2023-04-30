const {Router} = require('express');
const Right = require('../models/right');
const router = Router();

router.get('/',async (req,res)=>{
    const rights = await Right.findAll();
    res.json({rights});
})

module.exports = router