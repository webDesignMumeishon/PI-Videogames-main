import React from 'react'
import styles from './Addvideogame.module.css'  
const {REACT_APP_SERVER_BASE_URL} = process.env


export const Addvideogame = () => {
    const [errors, setErrors] = React.useState({});

    const [inputs, setInputs] = React.useState({
        vd_name: "name",
        vd_description: "description",
        vd_release: "dd/mm/aaaa", 
        vd_rating: "1",
        videogame_genre: {
            action: true,
            adventure: false,
            rpg: false,
            shooter: false,
            puzzle: false, 
            indie: false, 
            platformer: false,
            sports: false,
            racing: false
        },
        videogame_platform: {
            playstation_5: true,
            playstation_4: false,
            playstation_3: false,
            playstation_2: false,
            playstation_1: false,
            Xbox_360: false,
            Xbox_One: false,
            Nintendo: false,
            PC: false
        }
    })

    function handleFocus(e){
        setInputs({
            ...inputs,
            [e.target.name]: ""
        })

        setErrors(validate({
            ...inputs,
            [e.target.name]: e.target.value
        }));
    }

    function validate(input) {
        let errors = {};
        
        if (!input.vd_name) {
          errors.vd_name = "Invalid Name";
        }
    
        if (!input.vd_description) {
          errors.vd_description = "Invalid Description";
        }

        if (!input.vd_release) {
            errors.vd_release = "Invalid Date";
        }

        if (!input.vd_rating) {
            errors.vd_rating = "Invalid Rating";
        } 
        return errors;
    };

    const handleInputChange = function(e) {
        if(e.target.name === "videogame_genre"){
            setInputs({
                ...inputs,
                videogame_genre: {...inputs.videogame_genre, [e.target.value]: !inputs.videogame_genre[e.target.value]}
            });
        }
        else if(e.target.name === "videogame_platform"){
            setInputs({
                ...inputs,
                [e.target.name]: {...inputs.videogame_platform, [e.target.value]: !inputs.videogame_platform[e.target.value]}
            });
        }

        else{
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
            setErrors(validate({
                ...inputs,
                [e.target.name]: e.target.value
              }));
        }
    }
    const handleSubmit = (e) => {
        console.log(inputs)
        if(inputs.vd_name === "name" || inputs.vd_description === "description" || inputs.vd_release === "dd/mm/aaaa"){
            return alert("Invalid Inputs.\r Please Check Input Fields")
        }

        const genres = {
            action: 4,
            indie: 51,
            adventure: 3,
            rpg: 5,
            strategy: 2,
            shooter: 2,
            casual: 40,
            simulation: 14,
            puzzle: 7,
            arcade: 11,
            platformer: 83,
            racing: 1,
            sports: 15
        }

        const genreData = []
        for(let i in inputs.videogame_genre){
            if(inputs.videogame_genre[i]){
                genreData.push(i)
            }
        }

        const platformData = []
        for(let i in inputs.videogame_platform){
            if(inputs.videogame_platform[i]){
                platformData.push(i)
            }
        }
        // str.split(" ").map( w => w[0].toUpperCase() + w.slice(1, w.lenght)).join(" ")

        const data = {
            name: inputs.vd_name.split(" ").map( w => w[0].toUpperCase() + w.slice(1, w.lenght)).join(" "),
            // name: inputs.vd_name,  //old working
            description: inputs.vd_description,
            released: inputs.vd_release,
            rating: inputs.vd_rating,
            //array with genres names
            genre: genreData.map(v => genres[v]),
            //string of platforms
            platforms: platformData.map(x => x.replace("_", " ")).join(" ")
        }

        if(data.name ===  "" || data.description === "" || data.released === "" || data.rating === "" || data.genre.length === 0 || data.platforms === ""){
            return alert("Missing Inputs.\r Please Insert Values")
        }

        fetch(`${REACT_APP_SERVER_BASE_URL}/videogame`, {
            method: 'POST',
            body: JSON.stringify({ ...data }),
            headers: { 'Content-Type': 'application/json' },
        })
        alert("The game was created")
        
        
    }  

    return (
        <div className={styles.formInput} >
            <h2 className={styles.titleh2}>Add a New Game!</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.divText}>
                    <label htmlFor="name">
                    <span className={styles.formSpanTitle}>Name:</span>
                        <input 
                            onFocus={handleFocus}
                            onChange={handleInputChange}
                            type="text" 
                            value= {inputs["vd_name"]}
                            id="name" 
                            name="vd_name" 
                            className={errors.vd_name ? styles.danger : styles.formSpanTitle}
                        />
                        {errors.vd_name ? <span className={styles.danger}>{errors.vd_name}</span> : <span className={styles.formSpanTitle}>Insert Name</span>}
                    </label>

                    <label htmlFor="description">
                    <span className={styles.formSpanTitle}>Description: </span>
                        {/* working old */}
                        {/* <input 
                            onFocus={handleFocus}
                            onChange={handleInputChange} 
                            type="text" id="description" 
                            name="vd_description"
                            value= {inputs["vd_description"]}
                            className={errors.vd_description ? styles.danger : styles.formSpanTitle }
                        /> */}

                         <textarea 
                            style={{width:"138px", height: "85px"}}
                            onFocus={handleFocus}
                            onChange={handleInputChange} 
                            type="text" id="description" 
                            name="vd_description"
                            value= {inputs["vd_description"]}
                            className={errors.vd_description ? styles.danger : styles.formSpanTitle }
                        />

                        {errors.vd_description ? <span className={styles.danger}>{errors.vd_description}</span> : <span className={styles.formSpanTitle}>Insert Description</span>}
                    </label>

                    <label htmlFor="release">
                    <span className={styles.formSpanTitle}>Date:  </span>
                        <input 
                            onChange={handleInputChange} 
                            // onFocus={handleFocus}
                            type="date" 
                            id="release" 
                            name="vd_release"
                            value= {inputs["vd_release"]}
                            className={errors.vd_release ? styles.danger : styles.formSpanTitle}
                        />
                        {errors.vd_release ? <span className={styles.danger}>{errors.vd_release}</span> : <span className={styles.formSpanTitle}>Select Date</span>}

                    </label>

                    <label htmlFor="rating">
                    <span className={styles.formSpanTitle}>Rating:</span>
                        <input 
                            onFocus={handleFocus}
                            onChange={handleInputChange} 
                            type="number" 
                            id="rating" 
                            name="vd_rating"
                            value= {inputs["vd_rating"]}
                            className={errors.vd_rating ? styles.danger : styles.formSpanTitle}
                            min="1" max="5"
                        />   
                        {errors.vd_rating ? <span className={styles.danger}>{errors.vd_rating}</span> : <span className={styles.formSpanTitle}>Rating 1 to 5</span>}

                    </label>
                </div>
            
                <div className={styles.checkboxes}>
                    <div className={styles.subcheckbox}>
                        <legend>Videogames Genres</legend>
                        <label htmlFor="action">
                            <input onChange={handleInputChange} 
                            id="action" 
                            checked={inputs.videogame_genre.action} 
                            type="checkbox" 
                            name="videogame_genre" value="action"/>Action     
                        </label>

                        <label htmlFor="adventure">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_genre.adventure} 
                            type="checkbox" name="videogame_genre" 
                            id= "adventure"
                            value="adventure"/>
                            Adventure
                        </label>   

                        <label htmlFor="rpg">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_genre.rpg} 
                            id= "rpg"
                            type="checkbox" name="videogame_genre" 
                            value="rpg"/>RPG   
                        </label> 

                        <label htmlFor="shooter">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_genre.shooter} 
                            id= "shooter"
                            type="checkbox" name="videogame_genre" 
                            value="shooter"/>Shooter    
                        </label>  

                        <label htmlFor="puzzle">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_genre.puzzle} 
                            id= "puzzle"
                            type="checkbox" name="videogame_genre" 
                            value="puzzle"/>Puzzle     
                        </label>

                        <label htmlFor="indie">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_genre.indie} 
                            id= "indie"
                            type="checkbox" name="videogame_genre" 
                            value="indie"/>Indie     
                        </label>

                        <label htmlFor="platformer">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_genre.platformer} 
                            id= "platformer"
                            type="checkbox" name="videogame_genre" 
                            value="platformer"/>Platformer  
                        </label>

                        <label htmlFor="sports">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_genre.sports} 
                            type="checkbox" 
                            id= "sports"
                            name="videogame_genre" 
                            value="sports"/>Sports          
                        </label>

                        <label htmlFor="racing">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_genre.racing} 
                            type="checkbox" 
                            id= "racing"
                            name="videogame_genre" 
                            value="racing"/>Racing
                        </label>
                    </div>
     
                    <div className={styles.subcheckbox}>
                        <legend>Videogames Platforms</legend>
                        <label htmlFor="playstation_5">
                            <input onChange={handleInputChange} 
                            id= "playstation_5"
                            checked={inputs.videogame_platform.playstation_5} 
                            type="checkbox" name="videogame_platform" 
                            value="playstation_5"/>Playstation 5<br/>      
                        </label>  

                        <label htmlFor="playstation_4">
                            <input onChange={handleInputChange} 
                            id= "playstation_4"
                            checked={inputs.videogame_platform.playstation_4} 
                            type="checkbox" name="videogame_platform" 
                            value="playstation_4"/>Playstation 4<br/>      
                        </label>

                        <label htmlFor="playstation_3">
                            <input onChange={handleInputChange} 
                            id= "playstation_3"
                            checked={inputs.videogame_platform.playstation_3} 
                            type="checkbox" name="videogame_platform" 
                            value="playstation_3"/>Playstation 3      
                        </label>

                        <label htmlFor="playstation_2">
                            <input onChange={handleInputChange} 
                            id= "playstation_2"
                            checked={inputs.videogame_platform.playstation_2} 
                            type="checkbox" name="videogame_platform" 
                            value="playstation_2"/>Playstation 2      
                        </label>
                        
                        <label htmlFor="playstation_1">
                            <input onChange={handleInputChange} 
                            id= "playstation_1"
                            checked={inputs.videogame_platform.playstation_1}
                             type="checkbox" name="videogame_platform" 
                             value="playstation_1"/>Playstation 1     
                        </label>

                        <label htmlFor="Xbox_360">
                            <input onChange={handleInputChange} 
                            id= "Xbox_360"
                            checked={inputs.videogame_platform.Xbox_360} 
                            type="checkbox" name="videogame_platform" 
                            value="Xbox_360"/>Xbox_360<br/>      
                        </label>

                        <label htmlFor="Xbox_One">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_platform.Xbox_One} 
                            type="checkbox" name="videogame_platform" 
                            id= "Xbox_One"
                            value="Xbox_One"/>Xbox_One<br/>      
                        </label>

                        <label htmlFor="PC">
                            <input onChange={handleInputChange} 
                            id= "PC"
                            checked={inputs.videogame_platform.PC} 
                            type="checkbox" name="videogame_platform" 
                            value="PC"/>PC<br/>      
                        </label>

                        <label htmlFor="Nintendo">
                            <input onChange={handleInputChange} 
                            checked={inputs.videogame_platform.Nintendo} 
                            type="checkbox" name="videogame_platform" 
                            id= "Nintendo"
                            value="Nintendo"/>Nintendo<br/>      
                        </label>
                    </div>
                </div>
                <button className={styles.submit} type="submit">Submit</button>
            </form>
        </div>
    )
}
