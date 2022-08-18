import React,{ useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from './Cards'


export default function RatedMovies() {
    const [ratedMovies, setRatedMovies] = useState([])
    const sessionId = useSelector((state) => {
        return state.isLogin.sessionId
    })
    const accId = useSelector((state) => {
        return state.isLogin.userAccountId
    })

    useEffect(() => {          
        fetch(`https://api.themoviedb.org/3/account/${accId}/rated/movies?api_key=8758924ab5c823bb55f6379099bdc456&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`)
          .then(response => response.json())
          .then((result) => {
            setRatedMovies(result.results)
          })
          .catch(error => console.log('error', error));
    },[])

    return (
        <Cards cards={ratedMovies} />
    )
}