import React, { useState }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from './loginActions'


const Login = () => {

    const [userKeyInName, setUseKeyInName] = useState('')
    const [userKeyInPass, setUseKeyInPass] = useState('')
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => {
        return state.isLogin.isLogin
    })
    const userName = useSelector((state) => {
        return state.isLogin.userName
    })
    const errorMessage = useSelector((state) => {
        return state.isLogin.errorMessage
    })
    const userId = useSelector((state) => {
        return state.isLogin.userAccountId
    })
    const sessionId = useSelector((state) => {
        return state.isLogin.sessionId
    })

    const handelUserKeyName = (e) => {
        setUseKeyInName(e.target.value)
    }
    const handelUserKeyPass = (e) => {
        setUseKeyInPass(e.target.value)
    }

    const handelLogin = (e) => {
        e.preventDefault();
        const actionObj = Actions.initalLoad
        dispatch(actionObj(userKeyInName, userKeyInPass))
    }

    return (
        (isLogin ? <div></div> : 
        <form onSubmit={handelLogin}>
        <div className='errorMsg'>{errorMessage}</div>
        <div className='form-wrapper'>
            <h2>Login</h2>
            <div className='form-group'>
                <label htmlFor='username'>Username: </label>
                <input 
                    type='text' 
                    name='username' 
                    id='username'
                    onChange={(e) => {
                        handelUserKeyName(e) 
                    }}
                    value={userKeyInName}
                />   
            </div>
            <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        onChange={e => handelUserKeyPass(e)} 
                        value={userKeyInPass}
                    />
            </div>
            
            <input type='submit' value='Login' />
        </div>
    </form>)
        
    )
}

export default Login;