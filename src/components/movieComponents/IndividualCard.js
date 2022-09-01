import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from './MovieActions'
//getTargetRated
export default function IndividualCard({ratedMovies}) {
    const dispatch = useDispatch();
    const params = useParams();
    const [rate, setRate] = useState(1)
    const targetCard = useSelector((state) => {
        return state.moviesData.targetratedMovie
    })
    const [tarCard, setTarCard] = useState({})
    const targetRating = useSelector((state) => {
        return state.moviesData.targetRating
    })
    const userId = useSelector((state) => {
        return state.isLogin.userAccountId
    })
    const sessionId = useSelector((state) => {
        return state.isLogin.sessionId
    })
    const handelRateChange = (e) => {
        setRate(e.target.value)
    }

    const handelPostRate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "value": rate
        });

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`https://api.themoviedb.org/3/movie/${targetCard.id}/rating?api_key=8758924ab5c823bb55f6379099bdc456&session_id=${sessionId}`, requestOptions)
        dispatch(Actions.getRatedMovies(userId, sessionId))
        dispatch(Actions.getTargetRating(ratedMovies, Number(params.cardId)))
        dispatch(Actions.setTargetedRating(rate))
  

    }
    return (
        <div className='indivCard'>
              <img src={`https://image.tmdb.org/t/p/w500${targetCard.poster_path}`} />
              <div>
                    <h1>{targetCard.title}</h1>
                    <h2>Overview</h2>
                    <p>{targetCard.overview}</p>
                    <h2>Rating: {targetCard.vote_average}</h2>
                    <h2>Rate this movie</h2>
                    <select onChange={handelRateChange} value={rate}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <button onClick={() => {
                        handelPostRate()
                    }}>Click to rate the Moive</button>
                    {(targetRating < 1) ? <p>You have not rated this movie</p> : <p>You gave this movie a {targetRating} out of 10</p>}
                    <h2>Production Companies</h2>
                    {(targetCard.production_companies && targetCard.production_companies.map((logo) => {
                        return <img className='comp-logo' src={`https://image.tmdb.org/t/p/w500${logo.logo_path}`} />
                    }))}
                    {/* {console.log('can I map?' ,targetCard.production_companies)} */}
                    <div className='logos-container'>
                    </div>
              </div>
        </div>
    )
}