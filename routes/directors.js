const express = require('express');
const router = express.Router();

const Director=require('../models/Director');

/* GET home page. */
router.get('/', (req, res, next) => {
    Director.find({},(err,data)=>{
        if(err)
            res.json({error:err.message});
        else
            res.json(data);
    });
});

router.get('/:id',(req,res,next)=>{
    Director.findById(req.params.id,(err,data)=>{
        if(err)
            res.json({error:err.message});
        else
            res.json(data);
    });
});

router.put('/:id',(req,res,next)=> {
   Director.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,data)=>{
       if(err)
           res.json({error:err.message});
       else
           res.json({status:'OK'});
   });

});

router.delete('/:id',(req,res,next)=>{
    Director.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err)
            res.json({error:err.message});
        else
            res.json({status:'OK'});
    });
});

router.post('/',(req,res,next)=>{
    const {name,surname,bio}=req.body;
    const director=new Director({
        name:name,
        surname:surname,
        bio:bio
    });
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
