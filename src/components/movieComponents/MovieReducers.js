import * as Actions from './MovieActions'

const initialState = {
    cards: [],
    movieType: 'popular',
    currentPageNum: 1,
    totalPages: 0,
    likedIds: [],
    likedMovies: [],
    ratedMovies: [],
    targetratedMovie:{},
    targetRating:0,
}

const reducer = (state= initialState, action) => {
    switch(action.type){
        case Actions.SET_CARDS: {
            return {
                ...state,
                cards: action.payload.cards
            }
        }

        case Actions.SET_MOVIETYPE: {
            return {
                ...state,
                movieType: action.payload.movieType
            }
        }

        case Actions.SET_CURRENTPAGE: {
            return {
                ...state,
                currentPageNum: action.payload.currentPage
            }
        }

        case Actions.SET_TOTALPAGES: {
            return {
                ...state,
                totalPages: action.payload.totalPages
            }
        }

        case Actions.SET_PREVPAGE: {
            return {
                ...state,
                currentPageNum: (state.currentPageNum < 2 ? state.currentPageNum : state.currentPageNum - 1)
            }
        }

        case Actions.SET_NEXTPAGE: {
            return {
                ...state,
                currentPageNum: state.currentPageNum + 1
            }
        }

        case Actions.SET_LIKED_ID: {
            return {
                ...state,
                likedIds: action.payload.likedIds 
            }
        }

        case Actions.SET_LIKED_MOVIES: {
            return {
                ...state,
                likedMovies: action.payload.likedMovies 
            }
        }

        case Actions.SET_RATED_MOVIES: {
            return {
                ...state,
                ratedMovies: action.payload.ratedMovies 
            }
        }

        case Actions.SET_TARGET_RATED: {
            return {
                ...state,
                targetratedMovie: action.payload.targetratedMovie 
            }
        }

        case Actions.SET_TARGET_RATING: {
            return {
                ...state,
                targetRating: action.payload.targetRating 
            }
        }

        default: {
            return state
        }
    }
}

export default reducer;