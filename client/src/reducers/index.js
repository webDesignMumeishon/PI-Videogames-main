// import JSON from './JSON'

const initialState = {
    currentpage: null,
    videogamesLoaded: [],
    originalStorage: [],
    videogameDetail: {}
};

function rootReducer(state = initialState, action) {

    //demo
    if(action.type === "CURRENT_PAGE"){

        let ans = action.payload
        console.log(ans)
        return{
            ...state,
            currentpage: ans,
        }
    }

    if (action.type === "GET_VIDEOGAMES") {
        return {
            ...state,
            originalStorage: [...action.payload],
            videogamesLoaded: [...action.payload]
        };
    }

    if (action.type === "SORT_BY_RATING_GENRE") {
        //caso de array con muchos generos
        let ans = []
        for(let i = 0; i < action.payload.length; i++){
            let arr = state.originalStorage.filter(function(game){
                if(!ans.find(e => e.name === game.name)){
                    // return game.genres.find(g => g.name === action.payload[i]) working ----> old
                    var result = game.genres.find(g => g.name === action.payload[i]) 
                }
                return result
            })
            ans.push(...arr)
        }
        
        return {
            ...state,
            videogamesLoaded: [...ans]
        };
    }

    
    if (action.type === "SEARCH_VIDEOGAMES") {
        return {
            ...state,
            originalStorage: [...action.payload],
            videogamesLoaded: [...action.payload]
        };
    }

    if (action.type === "SORT_BY_NAME_ASC") {
        let ans = state.videogamesLoaded.sort(function(a, b) {
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })

        
        return {
            ...state,
            videogamesLoaded: [...ans]
        };
    }

    if (action.type === "SORT_BY_NAME_DES") {
        let ans = state.videogamesLoaded.sort(function(a, b) {
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        })
        
        return {
            ...state,
            videogamesLoaded: [...ans]
        };
    }

    if (action.type === "SORT_BY_RATING_ASC") {
        let ans = state.videogamesLoaded.sort(function (a, b) {
            return b.rating - a.rating;
        });
        
        return {
            ...state,
            videogamesLoaded: [...ans]
        };
    }

    if (action.type === "SORT_BY_RATING_DES") {
        let ans = state.videogamesLoaded.sort(function (a, b) {
            return a.rating - b.rating;
        });
        
        return {
            ...state,
            videogamesLoaded: [...ans]
        };
    }

    if (action.type === "FIND_VIDEOGAME_DETAILS") {
        return {
            ...state,
            videogameDetail: action.payload
        };
    }

    if(action.type === "SORT_BY_ORIGIN"){

        let ans = state.originalStorage.filter((game) => {
            return action.payload.test(game.id.toString() )
        })

        return {
            ...state,
            videogamesLoaded: [...ans]
        };
    }

    if(action.type === "CLEAN_FILTERS"){

        let ans = state.originalStorage

        return {
            ...state,
            videogamesLoaded: [...ans]
        }
    }
    return state;
}


  

export default rootReducer;