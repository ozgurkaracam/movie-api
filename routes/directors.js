const express = require('express');
const router = express.Router();

const Director=require('../models/Director');

/* GET home page. */
router.get('/', (req, res, next) => {
    Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ],(err,data)=>{
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
