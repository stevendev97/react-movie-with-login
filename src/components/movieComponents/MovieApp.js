import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from './MovieActions'
import { initalLoadFromLocal } from '../loginComponent/loginActions'
import Header from './Header';
import PagesBar from './PageBar';
import Cards from './Cards';
import Login from '../loginComponent/Login';



const MovieApp = () => {

    const dispatch = useDispatch();
    
    const { cards, movieType, currentPageNum, totalPages, likedIds, likedMovies } = useSelector((state) => {
        return state.moviesData
    })
    const logedIn = useSelector((state) => {
        return state.isLogin.isLogin
    })

    
    const [isInLiked, setIsInLiked] = useState(false);
    let userData = JSON.parse(localStorage.getItem('user'))
   
    useEffect(() => { 
        if (userData !== null){
            dispatch(initalLoadFromLocal(userData.sessionId))
            console.log('in here')
        }
        dispatch(Actions.initialLoadCards(movieType, currentPageNum))
    },[movieType,currentPageNum,logedIn])

    const [isInLogin, setIsInLogin] = useState((userData ? true : false));
    const handelLoginCliked = () => {
       setIsInLogin(!isInLogin)
    }
    const handelHome = () => {
        setIsInLogin(false)
        dispatch(Actions.initialLoadCards('popular', 1))
    }
    const handelLikeView = () => {
        setIsInLiked(true)
    }
    const handelHomeInLogedIn = () => {
        setIsInLiked(false)
        dispatch(Actions.initialLoadCards('popular', 1))
    }
 

    return (

        (
            isInLogin ? 
                <div>
                    {(logedIn ? 
                        <div>
                            <Header onHomeClick={handelHomeInLogedIn} onLikeView={handelLikeView}/>
                            {isInLiked ? '' : <PagesBar totalPages={totalPages} currentPageNum={currentPageNum}/> }
                            {isInLiked ? <Cards cards={likedMovies}/> : <Cards cards={cards}/>}
                        </div> : 
                        <div>
                            <Header onHomeClick={handelHome}/>
                            <Login />
                        </div>
                    )}
                </div> : 

               
                 <div>
                    <Header onHomeClick={handelHome} onLoginClik={handelLoginCliked}/>
                    <PagesBar totalPages={totalPages} currentPageNum={currentPageNum}/>
                    <Cards cards={cards}/>  
                </div>
               
               
        )
    )
}

export default MovieApp;