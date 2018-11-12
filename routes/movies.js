const express = require('express');
const router = express.Router();

const Movie=require('../models/Movie');
/* GET users listing. */
router.get('/', (req, res, next) => {
  Movie.find({},(err,data)=>{
    if(err)
      res.json({status: err});
    else{
      res.json(data);
    }
  });
});

router.get('/:id',(req,res,next)=>{
  Movie.findById(req.params.id,(err,data)=>{
    if(err)
      res.json({status:err});
    else
      res.json(data);
  });
});

router.put('/:id',(req,res,next)=>{
  Movie.findByIdAndUpdate(req.params.id,req.body,(err,data)=>{
    if(err)
      res.json({err : err});
    else{
      res.json({status: 'OK'});
      }
  });
});

router.delete('/:id',(req,res)=>{
  const promise = Movie.findByIdAndRemove(req.params.id);
  promise.then((data)=>{
    res.json({status:'OK'});
  }).catch((err)=>{
    res.json({error:err});
  });
});


router.post('/', (req,res,next)=>{
  const {title,imdb_score,category,country,year}=req.body;
  const movie=new Movie({
      title: title,
      imdb_score: imdb_score,
      category: category,
      country: country,
      year: year
  });
  movie.save((err,data)=>{
    if(err)
      res.json(err);
    else{
      res.json({status: 1});
    }
  });

});

module.exports = router;
