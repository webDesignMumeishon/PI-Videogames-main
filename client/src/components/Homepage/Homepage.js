import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import styles from './Homepage.module.css'

import {
    getVideogames, 
    searchVideogames, 
    cleanFilters,
    //demo
    currentPage
} from '../../actions/index.js'
import  {Videogames} from '../Videogames/Videogames.jsx';
// import { Pagination } from '../Pagination/Pagination.js'; working
import  Pagination  from '../Pagination/Pagination.js'; 


export const Homepage = (props) => {
    
    const [videogame, setVideogame] = useState('')
    const [loading, setLoading] = useState(false)
    const [postsPerPage] = useState(15)

    useEffect(() => {
        async function getGames(){
            setLoading(true)
            await props.getVideogames(props.videogames)
            setLoading(false)
        }
        getGames()

    }, [])
    
    //Input Controller
    const handleChange = (e) => {
        e.preventDefault();
        setVideogame(e.target.value)
    }
    
    //Input to find a game
    const handleSubmit = (e) =>{
        setLoading(true)
        e.preventDefault();
        props.searchVideogames(videogame).then(() => {setLoading(false)})
        props.currentPage(1)
    } 


    // Get current post 
    const indexOfLastPost = props.currentPageNum * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = props.videogames.slice(indexOfFirstPost, indexOfLastPost)   

    return (
        <div className={styles.homepageBody}>
            <form onSubmit={handleSubmit} className={styles.searchInput}>
                <label className={styles.searchlabel} htmlFor="videogame">Videogame: </label>
                <input 
                    type="text"
                    value={videogame}
                    id="videogame"
                    autoComplete="off"
                    onChange={handleChange}
                    className={styles.inputbox}
                />
                <button className={styles.searchbtn} type='submit'> Search</button>
            </form>
            
           <Videogames 
                games={currentPost} 
                loading={loading} 
                totalGames={props.videogames.length} 
                clean={props.cleanFilters}
            /> 

            <Pagination 
                postsPerPage={postsPerPage} 
                totalPosts={props.videogames.length} 
            />
        </div>
    )
}

function mapStateToProps(state) {
    return {
      videogames: state.videogamesLoaded,
      currentPageNum: state.currentpage
    };
}
  
function mapDispatchToProps(dispatch) {
    return {
        getVideogames: () => dispatch(getVideogames()),
        searchVideogames: (name) => dispatch(searchVideogames(name)),
        cleanFilters: () => dispatch(cleanFilters()),
        currentPage: (page) => dispatch(currentPage(page))
    };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);
  