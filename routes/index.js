const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const User=require('../models/User');


router.post('/register', (req, res, next) => {

    bcrypt.hash(req.body.password, 10).then( (hash)=> {
        const user=new User({
            username:req.body.username,
            password:hash
        });
        user.save((err,data)=>{
            if(err)
                res.json({error:err.message});
            else
                res.json({status:'OK'});
        });
    });


});

module.exports = router;
