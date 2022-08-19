export const SET_CARDS = 'SET_CARDS'
export const SET_MOVIETYPE = 'SET_MOVIETYPE'
export const SET_CURRENTPAGE = 'SET_CURRENTPAGE'
export const SET_TOTALPAGES = 'SET_TOTALPAGES'
export const SET_NEXTPAGE = 'SET_NEXTPAGE'
export const SET_PREVPAGE = 'SET_PREVPAGE'
export const SET_LIKED_ID = 'SET_LIKED_ID'
export const SET_LIKED_MOVIES = 'SET_LIKED_MOVIES'
export const SET_RATED_MOVIES = 'SET_RATED_MOVIES'
export const SET_TARGET_RATED = 'SET_TARGET_RATED'
export const SET_TARGET_RATING = 'SET_TARGET_RATING'


export const setCards = (cards) => {
    return {
        type: SET_CARDS,
        payload: {
            cards: cards
        }
    }
}

export const setTotalPages = (totalPages) => {
    return {
        type: SET_TOTALPAGES,
        payload: {
            totalPages: totalPages
        }
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENTPAGE,
        payload: {
            currentPage: currentPage
        }
    }
}

export const setMovieType = (movieType) => {
    return {
        type: SET_MOVIETYPE,
        payload: {
            movieType: movieType
        }
    }
}

export const setNextPage = () => {
    return {
        type: SET_NEXTPAGE,
    }
}

export const setPrevPage = () => {
    return {
        type: SET_PREVPAGE,
    }
}

export const setLikedId = (likedIds) => {
    return {
        type: SET_LIKED_ID,
        payload: {
            likedIds: likedIds
        }
    }
}

export const setLikedMOVIES = (likedMovies) => {
    return {
        type: SET_LIKED_MOVIES,
        payload: {
            likedMovies: likedMovies
        }
    }
}

export const setRatedMOVIES = (ratedMovies) => {
    return {
        type: SET_RATED_MOVIES,
        payload: {
            ratedMovies: ratedMovies
        }
    }
}

export const setTargetRated = (targetRatedMovie) => {
    return {
        type: SET_TARGET_RATED,
        payload: {
            targetratedMovie: targetRatedMovie
        }
    }
}

export const setTargetedRating = (rating) => {
    return {
        type: SET_TARGET_RATING,
        payload: {
            targetRating: rating
        } 
    }
}

export const initialLoadCards = (movieType, pageNum) => {
    return (dispatch) => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieType}?api_key=8758924ab5c823bb55f6379099bdc456&language=en-US&page=${pageNum}`
          )
            .then((resp) => {
              return resp.json();
            })
            .then((res) => {
              dispatch(setCards(res.results));
              dispatch(setTotalPages(res.total_pages));
              dispatch(setCurrentPage(pageNum))
              dispatch(setMovieType(movieType))
            });
    }
}

export const addLikedMovie = (accId, sessionId, movieId) => {

    return async (dispatch) => {
        console.log('is called', accId)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
        "media_type": "movie",
        "media_id": movieId,
        "favorite": true
        });
    
        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        await fetch(`https://api.themoviedb.org/3/account/${accId}/favorite?api_key=8758924ab5c823bb55f6379099bdc456&session_id=${sessionId}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            if (result.success){
                dispatch(getLikedMoviees(accId, sessionId))
            }
        }) 
    }
    
}

export const getLikedMoviees = (accId, sessionId) => {
    return (dispatch) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://api.themoviedb.org/3/account/${accId}/favorite/movies?api_key=8758924ab5c823bb55f6379099bdc456&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`, requestOptions)
          .then(response => response.json())
          .then(result => {
                const likedIds = result.results.map((eachResult) => {
                    return eachResult.id
                })
                dispatch(setLikedId(likedIds))
                dispatch(setLikedMOVIES(result.results))
            })
            .catch(error => console.log('error', error));
    }
}

export const getRatedMovies = (accId, sessionId) => {
    return async (dispatch) => {
        await fetch(`https://api.themoviedb.org/3/account/${accId}/rated/movies?api_key=8758924ab5c823bb55f6379099bdc456&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`)
        .then(response => response.json())
        .then((result) => {
            dispatch(setRatedMOVIES(result.results))
        })
        .catch(error => console.log('error', error));
    }
}

export const getTargetRated = (cardId) => {
    return async (dispatch) => {
            await fetch(`https://api.themoviedb.org/3/movie/${cardId}?api_key=8758924ab5c823bb55f6379099bdc456&language=en-US`)
            .then(respon => respon.json())
            .then((result) => {
                console.log(result)
                dispatch(setTargetRated(result))
            })
        }
}

export const getTargetRating = (ratedMovies,cardId) => {
    return async (dispatch) => {
        try {
            const targted = ratedMovies.find((movie) => {
                return movie.id === cardId
            })
            dispatch(setTargetedRating(targted.rating))
            console.log('success in set target rating' )
        } catch {
            dispatch(setTargetedRating(null))
        }
        
    }
}


export const deleteLikedMovie = (accId, sessionId, movieId) => {

    return async (dispatch) => {
        console.log('delete liked called')
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
        "media_type": "movie",
        "media_id": movieId,
        "favorite": false
        });
    
        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        await fetch(`https://api.themoviedb.org/3/account/${accId}/favorite?api_key=8758924ab5c823bb55f6379099bdc456&session_id=${sessionId}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            if (result.success){
                dispatch(getLikedMoviees(accId, sessionId))
            }
        })
    }
    
}