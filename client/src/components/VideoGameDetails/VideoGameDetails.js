import React from 'react'
import {videogameDetails} from '../../actions/index'
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import styles from './VideoGameDetails.module.css'

export const VideoGameDetails = (props) => {
    const [loading, setLoading] = useState(false)
    const {id} = props.match.params

    useEffect(() => {
        props.videogameDetails(id).then(x => { 
            setLoading(true)
        })
    }, []) 

    if(!loading){
        return <h1 className={styles.loading}>LOADING...</h1>
    }
    
    console.log(props.videogame)

    return (

        <div  id="mainBody">
                <style>
                {`  #mainBody::before {
                      content: '';
                      position: absolute;
                      height: 130vh;
                      width: 100%;
                      background-image: url(${props.videogame.image ? props.videogame.image : "https://previews.123rf.com/images/choostudio/choostudio1709/choostudio170900030/87107201-vector-8-bit-pixel-art-phrase-new-game-and-start-retro-game-interface-glitch-vhs-effect.jpg"});
                      background-size: cover;
                      background-position: top center;
                      opacity: 0.3;
                      border-radius: 10px;
                      left: 0;
                      top: 50px;
                    }`
                }
                </style>

            <div className={styles.mainBody}>
                <h1>Videogame Info</h1>
                    <div className={styles.subBody}>
                        <br/>
                        <h3>Name: </h3>
                        <p>{props.videogame.name}</p>
                        <br/>
                        <h3>Genres</h3>
                        <ul className={styles.alignText}>
                            {props.videogame.genres.map(g => <li className={styles.genreList}>{g.name}</li>)}
                        </ul>
                        <br/>
                        <h3>Platforms: </h3>
                        <p>
                            {props.videogame.platforms}
                        </p>
                        <br/>
                        <h3>Rating: </h3>
                        <p>
                            {props.videogame.rating}
                        </p>
                        <br/>
                        <h3>Released: </h3>
                        <p> 
                            {props.videogame.released}
                        </p>
                        <br/>
                        <h3>Description: </h3>
                        <p>
                            {props.videogame.description.replace(/<[^>]*>/g, "")}
                        </p>
                    </div>
                

            </div>
        </div>
    )
    
    
}

function mapStateToProps(state) {
    return {
        videogame: state.videogameDetail,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        videogameDetails: (id) => dispatch(videogameDetails(id)),
    };
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoGameDetails);
    
