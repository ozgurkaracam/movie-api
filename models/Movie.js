const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema=new Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    directory_id: Schema.Types.ObjectId,
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports= mongoose.model("movie",MovieSchema);