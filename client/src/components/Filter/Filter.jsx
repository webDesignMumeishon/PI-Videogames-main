import React from 'react'
import styles from './Filter.module.css'
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';

import { connect } from "react-redux";

import {
    sortByNameAsc, sortByNameDes, 
    sortByRatingAsc, sortByRatingDes,
    sortByGenre,
    sortByOrigin
} from '../../actions/index.js'

import { useState } from 'react';


export const Filter = (props) => {
    const [displayName, setDisplayName] = useState(false)
    const [displayRating, setDisplayRating] = useState(false)
    const [displayGenre, setDisplayGenre] = useState(false)
    const [displayOrigin, setDisplayOrigin] = useState(false)

    const [genre, setGenre] = useState({
        action: true,
        adventure: false,
        rpg: false,
        shooter: false,
        puzzle: false, 
        indie: false, 
        platformer: false,
        sports: false,
        racing: false
    })

    const handleInputChange = function(e) {
        e.preventDefault()
        let genreArr = []
        for(let i = 0; i < e.target.length -1 ; i++){
            if(e.target[i].checked ){
                genreArr.push(e.target[i].value)
            }
        }
        props.sortByGenre(genreArr)
    }

    const handleSubmitSortByOrigin = (e) => {
        console.log(e)
        
        if(e === "database"){
            let regex = /\w+-\w+-\w+-\w+-\w+/
            return props.sortByOrigin(regex)
        }
        else{
            let regex = /^\d+$/
            return props.sortByOrigin(regex)

        }
    }

    return (
        <div className={styles.body}>

            <div className={styles.dropdown}>
                <div className={styles.dropdownSelect} onClick={() => setDisplayName(!displayName)}>
                        <span>Order by Name</span>
                        {displayName ? <AiFillCaretUp style={{color: "white"}} /> : <AiFillCaretDown style={{color: "white"}} />}
                </div>  

                {displayName ? <div className={styles.dropdownList}>
                    <ul>
                        <li className={styles.dropdownListItem} onClick={() => {props.sortByNameAsc()}}>Ascendent</li>
                        <li className={styles.dropdownListItem} onClick={() => {props.sortByNameDes()}}>Descendent</li>
                    </ul>
                </div> : null}
            </div>

            <div className={styles.dropdown}>
                <div className={styles.dropdownSelect} onClick={() => setDisplayRating(!displayRating)}>
                        <span>Order by Rating</span>
                        {displayRating ? <AiFillCaretUp style={{color: "white"}} /> : <AiFillCaretDown style={{color: "white"}} />}
                </div>  

                {displayRating ? <div className={styles.dropdownList}>
                    <ul>
                        <li className={styles.dropdownListItem} onClick={() => {props.sortByRatingAsc()}}>Highest</li>
                        <li className={styles.dropdownListItem} onClick={() => {props.sortByRatingDes()}}>Lowest</li>
                    </ul>
                </div> : null}
            </div>

            <div className={styles.dropdown}>
                <div className={styles.dropdownSelect} onClick={() => setDisplayGenre(!displayGenre)}>
                        <span>Order by Genre</span>
                        {displayGenre ? <AiFillCaretUp style={{color: "white"}} /> : <AiFillCaretDown style={{color: "white"}} />}
                </div>  

                {displayGenre ? 
                <div className={styles.dropdownList}>
                    <form onSubmit={handleInputChange} className={styles.formCheckboxes}>
                        <label htmlFor="action">
                        <input 
                            id="action"
                            type="checkbox" 
                            checked={genre.action} 
                            onChange={() => setGenre(!genre.action)} 
                            name="videogame_genre" 
                            value="Action"/>Action<br/>      
                        </label>

                        <label htmlFor="adventure">
                        <input 
                            id="adventure"
                            type="checkbox" 
                            checked={genre.adventure}
                            name="videogame_genre" 
                            onChange={() => setGenre(!genre.adventure)}
                            value="Adventure"/>Adventure<br/>      
                        </label>

                        <label htmlFor="rpg">
                            <input 
                                id="rpg"
                                type="checkbox" 
                                checked={genre.rpg}
                                name="videogame_genre" 
                                onChange={() => setGenre(!genre.rpg)}
                                value="rpg"/>RPG<br/>      
                        </label>

                        <label htmlFor="shooter">
                            <input 
                                id="shooter"
                                type="checkbox" 
                                checked={genre.shooter}
                                name="videogame_genre" 
                                onChange={() => setGenre(!genre.shooter)}
                                value="Shooter"/>Shooter<br/>      
                        </label>

                        <label htmlFor="puzzle">
                            <input 
                                id="puzzle"
                                type="checkbox" 
                                checked={genre.puzzle}
                                name="videogame_genre" 
                                onChange={() => setGenre(!genre.puzzle)}
                                value="Puzzle"/>Puzzle<br/>      
                        </label>

                        <label htmlFor="indie">
                            <input 
                                id="indie"
                                type="checkbox" 
                                checked={genre.indie}
                                name="videogame_genre" 
                                onChange={() => setGenre(!genre.indie)}
                                value="Indie"/>Indie<br/>      
                        </label>

                        <label htmlFor="platformer">
                            <input 
                                id="platformer" 
                                type="checkbox" 
                                checked={genre.platformer}
                                name="videogame_genre" 
                                onChange={() => setGenre(!genre.platformer)}
                                value="Platformer"/>Platformer<br/>      
                        </label>

                        <label htmlFor="sports">
                            <input 
                                id="sports" 
                                type="checkbox" 
                                checked={genre.sports}
                                name="videogame_genre" 
                                onChange={() => setGenre(!genre.sports)}
                                value="Sports"/>Sports<br/>      
                        </label>

                        <label htmlFor="racing">
                            <input id="racing" 
                                type="checkbox" 
                                checked={genre.racing}
                                name="videogame_genre"
                                onChange={() => setGenre(!genre.racing)} 
                                value="Racing"/>Racing<br/>
                        </label>

                        <button type="submit">Sort</button>
                    </form>
                </div> : null}
            </div>

            <div className={styles.dropdown}>
                <div className={styles.dropdownSelect} onClick={() => setDisplayOrigin(!displayOrigin)}>
                        <span>Order by Origin</span>
                        {displayOrigin ? <AiFillCaretUp style={{color: "white"}} /> : <AiFillCaretDown style={{color: "white"}} />}
                </div>  

                {displayOrigin ? <div className={styles.dropdownList}>
                    <ul>
                        <li className={styles.dropdownListItem} onClick={() => {handleSubmitSortByOrigin("database")}}>Database</li>
                        <li className={styles.dropdownListItem} onClick={() => {handleSubmitSortByOrigin("api")}}>API</li>
                    </ul>
                </div> : null}
            </div>
       
       
        </div>
    )
}


function mapStateToProps(state) {
    return {
      videogames: state.videogamesLoaded,
    };
}
  
function mapDispatchToProps(dispatch) {
    return {
        sortByNameAsc: () => dispatch(sortByNameAsc()),
        sortByNameDes: () => dispatch(sortByNameDes()),
        sortByGenre: (genre) => dispatch(sortByGenre(genre)),
        sortByRatingAsc: () => dispatch(sortByRatingAsc()),
        sortByOrigin: (origin) => dispatch(sortByOrigin(origin)),
        sortByRatingDes: () => dispatch(sortByRatingDes()),
    };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);
  
