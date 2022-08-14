import * as Actions from './loginActions'

const initState = {
    isLogin: false,
    userName: '',
    userAccountId: '',
    sessionId: '',
    errorMessage: '',
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case Actions.IS_LOGIN: {
            return {
                ...state,
                isLogin: action.payload.isLogin
            }
        }

        case Actions.SET_USERDETAIL: {
            return {
                ...state,
                userName: action.payload.userName
            }
        }

        case Actions.SET_ERRORMESSAGE: {
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        }

        case Actions.SET_USERACCOUNT_ID: {
            return {
                ...state,
                userAccountId: action.payload.userAccountId
            }
        }

        case Actions.SET_SESSION_ID: {
            return {
                ...state,
                sessionId: action.payload.sessionId
            }
        }

        default: {
            return state
        }
    }
}

export default reducer