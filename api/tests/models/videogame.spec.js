const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const supertest = require('supertest');


describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' })
        .then(() => {console.log("It's Done")})
      });

      it('error no description provided', function(done) {
        Videogame.create({
          name: 'Metal Muma Soldier',
        })
        .then(() => done('Shouldt have created'))
        .catch(() => done());
      });
    });
  });
});




















// describe('Videogame model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Videogame.sync({ force: true }));

//     describe('name', () => {
      
//       it('should throw an error if name is null', (done) => {
//         Videogame.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Videogame.create({ name: 'Super Mario Bros' })
//         .then(() => {console.log("It's Done")})

//       });
//     });
//   });
// });
