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
    describe('/POST movie',()=>{
        it('it should add a movie',(done)=>{
            chai.request(server)
                .post('api/movies')
                .send({
                    title:'asdasd',
                    imdb_score:5,
                    category:'asdasdasd',
                    country:'türkiye',
                    year:'2019',
                    director_id:'5bea70ab57852e2a2e5522ba'
                })
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    done();
                });
        })
    });

    describe('/GET/:movieId',()=>{
        it('it should get /:movieId',(done)=>{
            chai.request(server)
                .get('/api/movies/'+movieId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    done();
                });
        })
    });

});