import React from "react";
import Cards from './Cards'


export default function RatedMovies({ratedMovies}) {
    return (
        <Cards cards={ratedMovies}/>
    )
}