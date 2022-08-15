import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from './MovieActions'
import { Link } from 'react-router-dom'


const Header = ({onLoginClik,onHomeClick,onLikeView}) => {
    const dispatch = useDispatch();
    const logedName = useSelector((state) => {
        return state.isLogin.userName
    })
    const movieType = useSelector((state) => {
        return state.moviesData.movieType
    })
    const userId = useSelector((state) => {
        return state.isLogin.userAccountId
    })
    const sessionId = useSelector((state) => {
        return state.isLogin.sessionId
    })
    const likedIds = useSelector((state) => {
        return state.moviesData.likedIds
    })
    const handelTypeChanged = (e) => {
        dispatch(Actions.setMovieType(e.target.value))
        dispatch(Actions.setCurrentPage(1))
    }
    
    return (
        <div className="navbar">
        <div>
          <img
            alt="logo"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          />
          <select value={movieType} onChange={ (e) => {
                handelTypeChanged(e)
        }}>
            <option value="popular">Popular</option>
            <option value="now_playing">Now Playing</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <div className="nav">
          <Link to='/'>
            <h1
              className="in-view"
              onClick={onHomeClick}
            >
              HOME
            </h1>
          </Link>
          <h1
            className="in-view"
            onClick={onLikeView}
          >
            LIKED
          </h1>
        </div>
        <div className='login-btn' onClick={() => {
            onLoginClik()
        }}>
            {(logedName ? logedName : 'Login')}
        </div>
      </div> 
    )
}

export default Header