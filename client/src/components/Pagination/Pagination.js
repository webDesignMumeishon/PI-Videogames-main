import React from 'react'
import styles from './Pagination.module.css'
import {useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from "react-redux";

import {
    currentPage
} from '../../actions/index.js'

export const Pagination = ({postsPerPage, totalPosts, currentPageNum, currentPage}) => {
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumber.push(i)
    }

    useEffect(() => {
        currentPage(1)
    }, [])

    return (
        <nav className={styles.pagination}>
            <button className={styles.btn} onClick={() => currentPage(currentPageNum-1 < 1 ? currentPageNum : currentPageNum-1)}> {"<"} </button>
            {pageNumber.map(number => (
                number === currentPageNum ? 
                <li key={number} className={styles.listItem}>
                    <NavLink onClick={() => currentPage(number)} to="#!" className={styles.selected}>
                        {number}
                    </NavLink>
                </li> : 
                <li key={number} className={styles.listItem}>
                    <NavLink onClick={() => currentPage(number)} to="#!">
                        {number}
                    </NavLink>
                </li>
            ))}
            <button className={styles.btn} onClick={() => currentPage(currentPageNum+1 > pageNumber.length ? currentPageNum : currentPageNum+1)} > {">"} </button>
        </nav>
    )
}

function mapStateToProps(state) {
    return {
        currentPageNum: state.currentpage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        currentPage: (page) => dispatch(currentPage(page))
    };
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);