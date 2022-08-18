import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

export default function IndividualCard() {
    const [rate, setRate] = useState(1)
    const params = useParams();
    const [targetedRate, setTargetRate] = useState(0)
    const sessionId = useSelector((state) => {
        return state.isLogin.sessionId
    })
    const accId = useSelector((state) => {
        return state.isLogin.userAccountId
    })
    const cards = useSelector((state) => {
        return state.moviesData.cards
    })
    const targetCard = cards.find((card) => (card.id === Number(params.cardId)))
    const handelRateChange = (e) => {
        setRate(e.target.value)
    }
    const handelPostRate = async () => {
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

        await fetch(`https://api.themoviedb.org/3/movie/${targetCard.id}/rating?api_key=8758924ab5c823bb55f6379099bdc456&session_id=${sessionId}`, requestOptions)
        setTargetRate(rate)
    }
    useEffect(() => {          
          fetch(`https://api.themoviedb.org/3/account/${accId}/rated/movies?api_key=8758924ab5c823bb55f6379099bdc456&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`)
            .then(response => response.json())
            .then((result) => {
                setTargetRate(result.results.filter((movie) => {
                    console.log(targetCard.id, movie.id)
                    return (movie.id === targetCard.id)
                })[0].rating)
            })
            .catch(error => console.log('error', error));
    },[])
    return (
        <div className='indivCard'>
              <img src={`https://image.tmdb.org/t/p/w500${targetCard.poster_path}`} />
              <div>
                    <h1>{targetCard.title}</h1>
                    <p>Rating: {targetCard.vote_average}</p>
                    <h3>Overview</h3>
                    <p>{targetCard.overview}</p>
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
                    <button onClick={handelPostRate}>Click to rate the Moive</button>
                    <p>You gave this movie a {targetedRate} out of 10</p>

              </div>
        </div>
    )
}