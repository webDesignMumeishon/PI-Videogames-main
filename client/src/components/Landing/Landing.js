import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Landing.module.css'
import image from './videogame.png'

export const Landing = () => {
    return (
        <div className={styles.bodyLanding}>
            <h1 className={styles.title}>Henry Videogames</h1>
            <img src={image} alt="landing_image" className={styles.imageStyling}/>
            <h1 className={styles.takeMeOver}><NavLink to='/home' className={styles.enter}>TAKE ME OVER !</NavLink></h1>
            
        </div>
    )
}
