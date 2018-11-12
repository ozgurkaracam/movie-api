const mongoose =require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://admin:asdasd31@ds049157.mlab.com:49157/restful-movie-api',{useNewUrlParser: true});
    mongoose.connection.on('open',()=>{
        console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error',(err)=>{
        console.log('hata çıktı'+err);
    });
};