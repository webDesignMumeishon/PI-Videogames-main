/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const supertest = require('supertest');


const fetch = require('node-fetch');
const chai = require('chai');
let chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

const agent = session(app);

const videogame = {
  name: 'Super Mario Bros',
  description: 'One of the most famous games ever in the arcade industry',
  released: '01/01/88',
  rating: 5,
  platforms: "PC"
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  // beforeEach(() => Videogame.sync({ force: true })
  // .then(() =>Videogame.destroy({
  //   truncate: true
  // })));

  beforeEach(() => Videogame.sync({ force: true }));

  beforeEach(async function(){
    let genres = null
    fetch(`https://api.rawg.io/api/genres?key=e7437dcf6c544dd890b4c48d4f2fecf3`)
    .then(res => res.json())
    .then(data => {
      data.results.forEach( genre => {
        Genre.create({
          id: genre.id,
          name: genre.name,
        });
      })
    })
  })
    
  describe('GET /videogame', () => {

    it('should get 200', (done) =>{
      agent.get('/videogame').expect(200)
      done()
    });

    it('responds with and object with length 81', (done) => {
      chai.request(app)
      .get('/videogame')
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a('array')
        response.body.length.should.be.eq(81)
      })
      done()
    });

    it('responds with and object', (done) => {
      chai.request(app)
      .get('/videogame/4200')
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a('object')
      })
      done()
    });

    it('responds with and object after searching in api', (done) => {
      chai.request(app)
      .get('/videogame?name=batman')
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a('array')
        response.body.length.should.be.eq(20)
      })
      done()
    });
  });

  describe('POST /videogame', () => {

    it('it should POST a new videogame', (done) => {
      const videogameMuma = {
        name: 'Super Muma Bros',
        description: 'One of the most famous games ever in the arcade industry',
        released: '15/11/96',
        rating: 5,
        platforms: "PC",
        genre: [11,7,2]
      }

      chai.request(app)
      .post('/videogame')
      .type('form')
      .send(videogameMuma)
      .end((err, response) => {
        response.body.should.have.property('name');
        response.body.should.have.property('id');
        response.body.should.have.property('description');
        response.body.should.have.property('released');
        response.body.should.have.property('rating');
        response.body.should.have.property('platforms');
      })
      done();
    });
  });

});










