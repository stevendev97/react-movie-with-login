import * as ActionsInMovieApp from '../movieComponents/MovieActions'

export const IS_LOGIN = 'IS_LOGIN'
export const SET_USERDETAIL = 'SET_USERDETAIL'
export const SET_ERRORMESSAGE = 'SET_ERRORMESSAGE'
export const SET_USERACCOUNT_ID = 'SET_USERACCOUNT_ID'
export const SET_SESSION_ID = 'SET_SESSION_ID'

export const isLoginAction = (boolean) => {
    return {
        type: IS_LOGIN,
        payload: {
            isLogin: boolean
        }
    }
}

export const setUserDetail = (userName) => {
    return {
        type: SET_USERDETAIL,
        payload: {
            userName: userName
        }
    }
}

export const setErrorMessage = (errorMsg) => {
    return {
        type: SET_ERRORMESSAGE,
        payload: {
            errorMessage: errorMsg
        }
    }
}

export const setUserAccountId = (id) => {
    return {
        type: SET_USERACCOUNT_ID,
        payload: {
            userAccountId: id
        }
    }
}

export const setSessionId = (id) => {
    return {
        type: SET_SESSION_ID,
        payload: {
            sessionId: id
        }
    }
}

export const initalLoad = (userKeyInName, userKeyInPass) => {
   
    return async (dispatch) =>{
        
        const userData = {
            userName: '',
            accountId: '',
            sessionId: '',
            requestToken: ''
        }

        const request1Url = 'https://api.themoviedb.org/3/authentication/token/new?api_key=8758924ab5c823bb55f6379099bdc456'
        const requestToken = await fetch(request1Url).then((resp)=>{
            return resp.json()
          }).then((res) => {
            userData.requestToken = res.request_token
            return res.request_token
          })
          const bodyWithToken = JSON.stringify({
            username: userKeyInName,
            password: userKeyInPass,
            request_token: requestToken
          }) 

        const request2Url = "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=8758924ab5c823bb55f6379099bdc456";
        const request3Url = 'https://api.themoviedb.org/3/authentication/session/new?api_key=8758924ab5c823bb55f6379099bdc456';
        const request4Url = 'https://api.themoviedb.org/3/account?api_key=8758924ab5c823bb55f6379099bdc456&session_id=';
      
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
      
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: bodyWithToken,
            redirect: 'follow'
          };
         
          await fetch(request2Url, requestOptions).then((res) => {
              if (res.ok === false){
                dispatch(isLoginAction(false))
              } 
          }) 
         
          const bodyOnlyToken = JSON.stringify({
            request_token: requestToken
          })
          const requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: bodyOnlyToken,
            redirect: 'follow'
          };
      
          
          const getSessionId = await fetch(request3Url,requestOptions2).then((resp) => {
            return resp.json()
          }).then((data) => {
            userData.sessionId = data.session_id
            dispatch(setSessionId(data.session_id))
            return data.session_id
          })

        


      
          await fetch(request4Url + getSessionId).then((resp) => {
            if (resp.ok === false){
                dispatch(isLoginAction(false))
                dispatch(setErrorMessage('Your user name and password do dont match!'))
              } else {
                dispatch(isLoginAction(true))
                return resp.json()
              }  
          }).then ((data) => {
            dispatch(setUserDetail(data.username))
            dispatch(setUserAccountId(data.id))
            userData.userName = data.username
            userData.accountId = data.id
            dispatch(ActionsInMovieApp.getLikedMoviees(data.id, getSessionId))
            dispatch(ActionsInMovieApp.getRatedMovies(data.id, getSessionId))
          })

        localStorage.setItem('user', JSON.stringify(userData))  
          
    }     
    
}

export const initalLoadFromLocal = (sessionId) => {
    return async (dispatch) => (
        await fetch('https://api.themoviedb.org/3/account?api_key=8758924ab5c823bb55f6379099bdc456&session_id=' + sessionId).then((resp) => {
            if (resp.ok === false){
                dispatch(isLoginAction(false))
                dispatch(setErrorMessage('Your user name and password do dont match!'))
              } else {
                dispatch(isLoginAction(true))
                return resp.json()
              }  
          }).then ((data) => {
            dispatch(setUserDetail(data.username))
            dispatch(setUserAccountId(data.id))
            dispatch(setSessionId(sessionId))
            dispatch(ActionsInMovieApp.getLikedMoviees(data.id, sessionId))
            dispatch(ActionsInMovieApp.getRatedMovies(data.id, sessionId))
          })
    )
}