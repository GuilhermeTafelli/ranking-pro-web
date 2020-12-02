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
    address: null,
    number: null, 
    postalCode: null,
    complement: null,
    city: null,
    state: null, 
    country: null,
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
    switch (action.type){
        case 'REGISTRY_STEP_ONE':
            return {
                ...state,
                name: action.name,
                bday: action.bday,
                sex: action.sex,
                phone: action.phone,
                whatsApp: action.whatsapp,
                email: action.email,
                photo: action.photo,
                step: 2
            }
        case 'REGISTRY_STEP_TWO':
            console.log("enter", action)
            return {
                ...state,
                address: action.address,
                number: action.number, 
                postalCode: action.postalCode,
                complement: action.complement,
                city: action.city,
                state: action.state, 
                country: action.country,
                step: 2
            }
        case 'BACK_STEP':
            return {
                ...state,
                step: state.step-1
            }
        default: 
            return state
    }
}

const store = createStore(combineReducers({auth, registry}))

export default store;
