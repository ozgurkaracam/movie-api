const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
chai.use(chaiHttp);

let token, movieId;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authentication')
            .send({username: 'evdeyim', password: 'evde'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    });
    describe('/POST movies', () => {
        it('it should POST  movies', (done) => {
            chai.request(server)
                .post('/api/movies')
                .send({
                    title:"deneme",
                    imdb_score:5,
                    category:"korku",
                    country:"türkiye"
                })
                .set('x-access-token', token)
                .end((err, res) => {
                    movieId=res.body.data._id;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("data");
                    done();
                });
        })
    });
    describe('/GET ma movie',()=>{
        it('it should GET a movie',(done)=>{
            chai.request(server)
                .get('/api/movies/'+movieId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    done();
                });
        })
    });

    describe('/DELETE a movie',()=>{
        it('it should delete a movie',(done)=>{
            chai.request(server)
                .delete('/api/movies/'+movieId)
                .set('x-access-token',token)
                .end((err,res)=>{
                   res.should.have.status(200);
                   res.body.should.have.property('status');
                   done();
                });
        })
    });

});