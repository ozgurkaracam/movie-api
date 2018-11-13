const express = require('express');
const router = express.Router();

const Director=require('../models/Director');

/* GET home page. */
router.get('/', (req, res, next) => {
    Director.find({},(err,data)=>{
        res.json(data);
    });
});

router.post('/',(req,res,next)=>{
    const director=new Director(req.body);
    director.save((err,data)=>{
        if(err)
            res.json({error:err.message});
        else
            res.json({
                status:'OK',
                data: data
            });
    });
});


module.exports = router;
