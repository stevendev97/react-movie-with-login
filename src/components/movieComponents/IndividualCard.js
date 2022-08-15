import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

export default function IndividualCard() {
    const params = useParams();
    const cards = useSelector((state) => {
        return state.moviesData.cards
    })
    const targetCard = cards.find((card) => (card.id === Number(params.cardId)))
    console.log(targetCard)
    return (
        <div className='indivCard'>
              <img src={`https://image.tmdb.org/t/p/w500${targetCard.poster_path}`} />
              <div>
                  <h1>{targetCard.title}</h1>
                  <p>Rating: {targetCard.vote_average}</p>
                  <h3>Overview</h3>
                  <p>{targetCard.overview}</p>
              </div>
        </div>
    )
}