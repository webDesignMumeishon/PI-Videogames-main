import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Videogames.module.css'
import  Filter  from '../Filter/Filter'

export const Videogames = ({games, loading, totalGames, clean}) => {

    if(loading){
        return <h2>Loading...</h2>
    }             

    return (
        <div>
            <div className={styles.showingTextWrapper}>
                <p className={styles.showingText}>Showing {games.length} of {totalGames} results </p> 
                <button className={styles.showingButtom} onClick={() => clean()}>Clean filters</button>
            </div>
            
            <div className={styles.body}>
                <Filter/>
                <ul className={styles.mainBody}>
                    {games.length === 0 ? <img className={styles.notFoundImg} src={"https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"} alt="Negative Result"/> : games.map(game =>
                    (
                        <li key={game.id} className={styles.gamesList}>
                            <img src={game.image ? game.image : "https://cdn.cloudflare.steamstatic.com/steam/apps/681040/header.jpg?t=1504857051"} alt="game_image" className={styles.gamesimage} />
                            <div className={styles.divText}>
                            <Link to={`/home/${game.id}`}>{game.name}</Link>
                            <ul>
                                {game.genres.map(g => <li key={g.id} className={styles.liGenre}>{g.name}</li>)}
                            </ul>

                            </div>
                        </li>
                    ))   
                    }
                </ul>
            </div>

        </div>
    )
}

