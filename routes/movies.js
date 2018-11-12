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
