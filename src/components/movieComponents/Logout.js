import React from 'react'
import * as Actions from '../loginComponent/loginActions'
import { useDispatch } from 'react-redux'

const Logout = () => {
    const dispatch = useDispatch();
    const handelLogout = () => {
        //dispatch(Actions.deleteLikedMovie(userId, sessionId, movieId))
        localStorage.clear()
        dispatch(Actions.isLoginAction(false)) 
        dispatch(Actions.setUserDetail(null))
    }
    return (
        <button onClick={handelLogout}>Logout</button>
    )
}

export default Logout