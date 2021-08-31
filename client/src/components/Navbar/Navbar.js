import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.css'
import { CgGames } from 'react-icons/cg';

const activeStyle = {
    backgroundColor: "#6f787a",
    borderRadius: "5px",
    // color: "black",
}


export const Navbar = () => {
    return (
        <nav className={styles.list}>
            <NavLink to="/home">
                <CgGames className={styles.logo}/>
            </NavLink>
            <ul>
                <NavLink activeStyle={activeStyle} to="/home">
                    <li>Home</li>
                </NavLink>
                
                <NavLink activeStyle={activeStyle} to="/addvideogame">
                    <li>Add Videogame</li>
                </NavLink>
            </ul>
        </nav>
    )
}
