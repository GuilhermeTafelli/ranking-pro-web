import { createStore, combineReducers } from 'redux';


const AUTH_INITIAL_STATE = {
    isAuthenticated: false,
    user: null
}

const REGISTRY_INITIAL_STATE = {
    name: null,
    bday: null,
    sex: null,
    phone: null,
    whatsapp: null,
    email: null,
    photo: null,
    step: 1
}


function auth(state = AUTH_INITIAL_STATE, action) {
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

function registry(state = REGISTRY_INITIAL_STATE, action) {
    console.log(action)
    switch (action.type){
        case 'REGISTRY_STEP_ONE':
            console.log("enter", action)
            return {
                ...state,
                name: action.name,
                bday: action.bday,
                sex: action.sex,
                phone: action.phone,
                whatsapp: action.whatsapp,
                email: action.email,
                photo: action.photo,

            }
        default: 
            return state
    }
}

const store = createStore(combineReducers({auth, registry}))

export default store;
