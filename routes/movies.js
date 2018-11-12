const express = require('express');
const router = express.Router();

const Movie=require('../models/Movie');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('movies router');
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
