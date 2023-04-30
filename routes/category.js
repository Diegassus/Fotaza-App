const {Router, response} = require('express');
const Category = require('../models/category');
const router = Router();

router.get('/', async(req, res = response)=>{
    try{
        const categories = await Category.findAll();
        return res.json({
            msg:1,
            categories
        });
    }catch(error){
        return res.status(500).json({
            msg:0,
            error
        });
    }
})

module.exports = router