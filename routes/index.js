const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const User=require('../models/User');
const jwt= require('jsonwebtoken');


router.get('/',(req,res,next)=>{
   req.send("anasayfa") ;
});

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
                        if(data){
                            const payload={username: req.body.username};
                            const token=jwt.sign(payload,req.app.get('api_secret_key'),{
                                expiresIn:  720// 12 saat
                            });
                            req.body.token=token;
                            req.headers['x-access-token']=token;
                            res.json({status:true,
                                    token
                            });
                        }


                        else
                            res.json({status:'yanlış parola.'})
                    }

                });
            }
        }
    });
});

module.exports = router;
