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

router.post('/authentication',(req,res)=>{
    User.findOne({username:req.body.username},(err,data)=>{
        if(err)
            res.json({error:err.message});
        else{
            if(!data)
                res.json({status:'Kullanıcı bulunamadı!'});
            else{
                bcrypt.compare(req.body.password,data.password,(err,data)=>{
                    if(err)
                        res.json({error:err.message});
                    else{
                        if(data)
                            res.json({status:'giriş başarılı'});
                        else
                            res.json({status:'yanlış parola.'})
                    }

                });
            }
        }
    });
});

module.exports = router;
