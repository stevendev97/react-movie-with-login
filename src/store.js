import { applyMiddleware, createStore , combineReducers} from 'redux'
import thunk from 'redux-thunk'
import MovieReducers from './components/movieComponents/MovieReducers'
import loginReducers from './components/loginComponent/loginReducers'

const rootReducer = combineReducers({
    moviesData: MovieReducers,
    isLogin: loginReducers
})

const middelwares = applyMiddleware(thunk)

const store = createStore(rootReducer,middelwares)

export default store;