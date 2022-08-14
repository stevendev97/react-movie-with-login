import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from './MovieActions'



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
    const handelLikeClick = (movieId) => {
        if (isLogin){
          if(likedIds.includes(movieId)){
            dispatch(Actions.deleteLikedMovie(userId, sessionId, movieId))
          } else {
            dispatch(Actions.addLikedMovie(userId, sessionId, movieId))
          }
        }
    }

    return (
      <div className="card-container">
        {props.cards.map((card) => {
          return (
            <div className="card" key={card.id} id={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500${card.poster_path}`} />
           
                <h3
                  className="title"
                >
                  {card.original_title}
                </h3>
           
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