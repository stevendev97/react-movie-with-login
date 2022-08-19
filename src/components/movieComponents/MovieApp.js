import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from './MovieActions'
import { initalLoadFromLocal } from '../loginComponent/loginActions'
import Header from './Header';
import PagesBar from './PageBar';
import Cards from './Cards';
import Login from '../loginComponent/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IndividualCard from './IndividualCard'
import RatedMovies from './RatedMovies';
import LikedMovies from './LikedMovies'
import Logout from './Logout';



const MovieApp = () => {

    const dispatch = useDispatch();
    const { cards, movieType, currentPageNum, totalPages, likedIds, likedMovies } = useSelector((state) => {
        return state.moviesData
    })
    const logedIn = useSelector((state) => {
        return state.isLogin.isLogin
    })
    const ratedMovies = useSelector((state) => {
        return state.moviesData.ratedMovies
    })
    let userData = JSON.parse(localStorage.getItem('user'))
   
    useEffect(() => { 
        if (userData !== null){
            dispatch(initalLoadFromLocal(userData.sessionId))
        }
        dispatch(Actions.initialLoadCards(movieType, currentPageNum))
    },[movieType,currentPageNum,logedIn])

    const [isInLogin, setIsInLogin] = useState((userData ? true : false));
    const [logOut, setLogOut] = useState(false)
    const handelLoginCliked = () => {
        if (isInLogin) {
            setLogOut(!logOut)
        } else {
            setIsInLogin(!isInLogin)
        }
    }
    const handelHome = () => {
        setIsInLogin(false)
        dispatch(Actions.initialLoadCards('popular', 1))
    }
    const handelHomeInLogedIn = () => {
        dispatch(Actions.initialLoadCards('popular', 1))
        if(logOut) {
            setLogOut(!logOut)
        }
    }
 

    return (

        (
            
            isInLogin ? 
                <div>
                    {(logedIn ? 
                    <Router>
                        <Routes>
                            <Route path='/' exact element={
                                <div>
                                    <Header onHomeClick={handelHomeInLogedIn} onLoginClik={handelLoginCliked} logOut={logOut}/>
                                    <PagesBar totalPages={totalPages} currentPageNum={currentPageNum}/>
                                    <Cards cards={cards}/>
                                </div>
                            }/>
                            <Route path='/incard/:cardId' element={
                                <div>
                                    <Header onHomeClick={handelHomeInLogedIn} onLoginClik={handelLoginCliked}/>
                                    <IndividualCard ratedMovies={ratedMovies}/>
                                </div>                         
                            }/>
                            <Route path='/liked' element={
                                <div>
                                    <Header onHomeClick={handelHomeInLogedIn} onLoginClik={handelLoginCliked}/>
                                    <LikedMovies />
                                </div>                         
                            }/>
                            <Route path='/rated' element={
                                <div>
                                    <Header onHomeClick={handelHomeInLogedIn} onLoginClik={handelLoginCliked}/>
                                    <RatedMovies ratedMovies={ratedMovies}/>
                                </div>                         
                            }/>

                        </Routes>
                    </Router>
                    :
                    <Router>
                        <Routes>
                            <Route path='/' exact element={
                                <div>
                                <Header onHomeClick={handelHome}/>
                                <Login />
                                </div>
                            } />
                        </Routes>
                    </Router> 
                    )}
                </div> : 

               <Router>
                    <>
                        <Routes>
                            <Route path='/' exact element={
                                <div>
                                    <Header onHomeClick={handelHome} onLoginClik={handelLoginCliked}/>
                                    <PagesBar totalPages={totalPages} currentPageNum={currentPageNum}/>
                                    <Cards cards={cards}/>     
                                </div>
                            }/>
                            <Route path='/incard/:cardId' element={
                                <div>
                                    <Header onHomeClick={handelHome} onLoginClik={handelLoginCliked}/>
                                    <IndividualCard/>
                                </div>                         
                            }/>
                        </Routes> 
                    </>
               </Router>



                //  <div>
                //     <Header onHomeClick={handelHome} onLoginClik={handelLoginCliked}/>
                //     <PagesBar totalPages={totalPages} currentPageNum={currentPageNum}/>
                //     <Cards cards={cards}/>  
                // </div>
               
               
        )
    )
}

export default MovieApp;
