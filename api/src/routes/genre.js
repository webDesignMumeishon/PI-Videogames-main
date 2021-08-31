const { Router } = require('express');
const router = Router();
const {Genre} = require('../db') 



router.get('/', async (req, res) => {
    // [ ] GET /genres:
    // Obtener todos los tipos de géneros de videojuegos posibles   
    const genres = await Genre.findAll({})
    res.json(genres)
})


module.exports = router;
