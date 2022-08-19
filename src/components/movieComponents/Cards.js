import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from './MovieActions'
import { Link } from 'react-router-dom';



export default function Cards(props) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => {
        return state.isLogin.userAccountId
    })
    const sessionId = useSelector((state) => {
        return state.isLogin.sessionId
    })
    const isLogin = useSelector((state) => {
        return state.isLogin.isLogin
    })
    const likedIds = useSelector((state) => {
        return state.moviesData.likedIds
    })
    const ratedMovies = useSelector((state) => {
      return state.moviesData.ratedMovies
  })
    const handelLikeClick = (movieId) => {
        if (isLogin){
          if(likedIds.includes(movieId)){
            dispatch(Actions.deleteLikedMovie(userId, sessionId, movieId))
          } else {
            dispatch(Actions.addLikedMovie(userId, sessionId, movieId))
          }
        }
    }
    const handelTitleClick = (cardId) => {
      dispatch(Actions.getTargetRated(cardId))
      dispatch(Actions.getTargetRating(ratedMovies, cardId))
    }
    return (
      <div className="card-container">
        {props.cards.map((card) => {
          return (
            <div className="card" key={card.id} id={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500${card.poster_path}`} />
              { isLogin ? 
                  <>
                    <Link to={`/incard/${card.id}`}>
                      <h3
                        className="title"
                        onClick={() => {
                          handelTitleClick(card.id)
                        }}
                      >
                        {card.original_title}
                      </h3>
                    </Link>
                  </> :  
                  <h3
                      className="title"
                    >
                      {card.original_title}
                  </h3>
              }
              <div className="rate-like-row">
                <p>{card.vote_average}</p>
                <i onClick={() => {
                   handelLikeClick(card.id) 
                }} className={(likedIds.includes(card.id) ? 'ion-heart liked' : 'ion-heart')}></i> 
              </div>
            </div>
          );
        })}
      </div>
    );
  }