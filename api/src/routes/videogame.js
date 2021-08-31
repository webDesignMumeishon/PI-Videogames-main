const { Router } = require('express');
const router = Router();
const { Videogame, Genre} = require('../db') 
const fetch = require("node-fetch");
const { raw } = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {
    MY_API_KEY
} = process.env;

router.get('/', async (req, res, next) => {
    const {name} = req.query

    if(name){
        return next()
    }

    const videogamesForeignApi = () => {
            return fetch(`https://api.rawg.io/api/games?page_size=100&key=${MY_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                return fetch (data.next)
                .then(res => res.json())
                .then(data2 => {
                    return [...data.results, ...data2.results]
                })
                .then(r => {
                return r.map(game => {
                    return {
                        name: game.name,
                        image: game.background_image,
                        genres: game.genres,
                        rating: game.rating,
                        id: game.id
                    }})
                })
            })
        .catch(err => {console.log(err)})
    }

    let result = await videogamesForeignApi()

    Videogame.findAll({
        include: { 
            model: Genre, 
            attributes:['name']
        },
    })
    .then( data => {
        return res.json(result.concat(data))
    })
})

router.get('/', async (req, res) => {
    const {name} = req.query
    const videogamesForeignApi = (name) => {
        return fetch(`https://api.rawg.io/api/games?search=${name}&key=${MY_API_KEY}`)
        .then(res => res.json())
        .then( data => {
            const games = data.results.map(game => {return {
                name: game.name,
                image: game.background_image,
                genres: game.genres,
                rating: game.rating,
                id: game.id
            }})
            return games
        })
        .catch(err => {console.log(err)})
    }

    let resultAPI = await videogamesForeignApi(name)

    //Codigo para solo buscar en la API
    // return res.json(result) //working

    //Codigo para buscar el juego traido por query en la base de datos
    Videogame.findAll({
        //Solo busca el nombre estrictamente. El primer nombre que se encuentre en la base de datos es el que se devuelve
        // where: {
        // "name": name
        // },

        //Se busca "name" como substring en toda la baser de datos y se trae un arreglo con todas las coincidencias
        where: {
            "name": {
                [Op.iLike]: '%' + name + '%'
            }
        },
        include: { 
            model: Genre, 
            attributes:['name']
        },
    })
    .then( data => {
        //Devuelvo solamente resultAPI si no se encontro el videojuego en la base de datos
        if(!data.length){
            return res.json(resultAPI)
        }

        //Si se encontro el videojuego le agrego una propiedad imagen para que despliegue correctamente en el componente
        let resultDb = data.map(p => p.toJSON())
        //map para devolver varios resultados
        resultDb = resultDb.map(x => {return {...x, image:false}})

        //Devuelvo un solo resultado de la db
        // resultDb = {
        //     ...resultDb['0'],
        //     image: false
        // }

        //Devuelvo lo que se encontro en la API y la base de datos
        return res.json(resultAPI.concat(resultDb))
    })
})


router.get('/:idVideogame', async (req, res) => {
    const {idVideogame} = req.params

    const videogamesForeignApi = (idVideogame) => {
        return fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${MY_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            
            //Si no se encontro el juego se retorna un false. Con ese false pasa a buscar en la base de datos.
            if(data.detail === "Not found."){
                return false
            }

            const games = {
                name: data.name,
                image: data.background_image,
                description: data.description,
                released: data.released,
                rating: data.rating,

                // old: trae las plataformas como un array.
                // platforms: data.platforms,

                //new: trae las plataformas en formato string. Fran dijo que se podia hacer asi. 
                platforms: data.platforms.map( p => p.platform.name).join(" "),
                genres: data.genres
            }
            return games
        })
        .catch(err => {console.log(err)})
    }

    let resultFromApi = await videogamesForeignApi(idVideogame)
    
    if(!resultFromApi){
        try{
            const resultFromDb = await Videogame.findAll({ 
                where: {
                    id : idVideogame
                }, 
                include: { 
                    model: Genre, 
                    attributes:['name']
                }
                
            })
            return res.json(...resultFromDb)
        }
        catch(err){
            return res.json(err)
        }
        
    }

    return res.json(resultFromApi)
})


router.post('/', async (req, res) => {

    const {name, description, released, rating, platforms, genre} = req.body

    if(name ===  "" || description === "" || released === "" || rating === "" || genre.length === 0 || platforms === ""){
        return res.send("Unsuccesful Post")
    }

    try{
        let videogame = await Videogame.create({
            name,
            description,
            released,
            rating, 
            platforms
        })
    
        await videogame.setGenres(genre)
        res.json(videogame) 
    }
    catch(err){
        return res.json(err)
    }
})

//Router export
module.exports = router;



