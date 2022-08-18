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
                    <Router>
                        <Routes>
                            <Route path='/' exact element={
                                <div>
                                    <Header onHomeClick={handelHomeInLogedIn} onLikeView={handelLikeView}/>
                                    {isInLiked ? '' : <PagesBar totalPages={totalPages} currentPageNum={currentPageNum}/> }
                                    {isInLiked ? <Cards cards={likedMovies}/> : <Cards cards={cards}/>}
                                </div>
                            }/>
                            <Route path='/incard/:cardId' element={
                                <div>
                                    <Header onHomeClick={handelHomeInLogedIn} onLikeView={handelLikeView}/>
                                    {isInLiked ? <Cards cards={likedMovies}/> : <IndividualCard/>}
                                </div>                         
                            }/>
                            <Route path='/rated' element={
                                <div>
                                    <Header onHomeClick={handelHomeInLogedIn} onLikeView={handelLikeView}/>
                                    {isInLiked ? <Cards cards={likedMovies}/> : <RatedMovies />}
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
