export function getVideogames() {
    return function(dispatch) {
        return fetch("http://localhost:3001/videogame")
        .then(response => response.json())
        .then(json => {
            // console.log("json response", json)
            dispatch({ type: "GET_VIDEOGAMES", payload: json });
        });
    };
}

export function currentPage(payload){
    return {type: "CURRENT_PAGE", payload}
}

export function searchVideogames(name) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/videogame?name=${name}`)
        .then(response => response.json())
        .then(json => {
            // console.log("json response", json)
            dispatch({ type: "SEARCH_VIDEOGAMES", payload: json });
        });
    };
}


export function sortByNameAsc(){
    return {type: "SORT_BY_NAME_ASC", }
}

export function sortByNameDes(){
    return {type: "SORT_BY_NAME_DES", }
}

export function sortByRatingAsc(){
    return {type: "SORT_BY_RATING_ASC", }
}

export function sortByRatingDes(){
    return {type: "SORT_BY_RATING_DES", }
}

export function videogameDetails(id){
    return function(dispatch) {
        return fetch(`http://localhost:3001/videogame/${id}`)
        .then(response => response.json())
        .then(json => {
            // console.log("json response", json)
            dispatch({ type: "FIND_VIDEOGAME_DETAILS", payload: json });
        });
    };
}

//SORT BY GENRE BETA
export function sortByGenre(payload){
    return {type: "SORT_BY_RATING_GENRE", payload }
}

export function sortByOrigin(payload){
    return {type: "SORT_BY_ORIGIN", payload }
}

export function cleanFilters(payload){
    return {type: "CLEAN_FILTERS", payload }
}





