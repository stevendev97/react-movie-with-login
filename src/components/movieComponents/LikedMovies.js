import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cards from './Cards'


export default function LikedMovies() {
    const likedMovies = useSelector((state) => {
        return state.moviesData.likedMovies
    })
    return (
        <Cards cards={likedMovies} />
    )
}