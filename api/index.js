const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const fetch = require("node-fetch");
const {Genre} = require('./src/db')
const Sequelize = require('sequelize')

const {
  MY_API_KEY
} = process.env;


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    //Message from post
    console.log('%s listening at 3001');

    //Load all genres
    let genres = null
    fetch(`https://api.rawg.io/api/genres?key=${MY_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      data.results.forEach( genre => {
        Genre.create({
          id: genre.id,
          name: genre.name,
        });
      })
    })
  });
});
