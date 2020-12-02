import { createStore } from 'redux';


const INITIAL_STATE = {
    isAuthenticated: false,
    user: null
}


function auth(state = INITIAL_STATE, action) {
    console.log(action)
    switch (action.type){
        case 'LOGIN':
            return {...state, isAuthenticated: true, user: action.user}
        case 'LOGOUT':
            return {...state, isAuthenticated: false, user: null}
        case 'SET_SESSION':
            return {...state, isAuthenticated: action.isAuthenticated, user: action.user}
        default: 
            return state
    }
}

const store = createStore(auth)

export default store;
