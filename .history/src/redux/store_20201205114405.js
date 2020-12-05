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
    whatsApp: null,
    email: null,
    photo: null,
    photoFile: null,
    address: null,
    number: null, 
    postalCode: null,
    complement: null,
    city: null,
    state: null, 
    country: null,
    step: 1,
    skills: {values:[]},
    niches: {values:[]}
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
            console.log("2")
            return {
                ...state,
                name: action.name,
                bday: action.bday,
                sex: action.sex,
                cpf: action.cpf,
                whatsApp: action.whatsApp,
                email: action.email,
                cpf: action.cpf,
                photo: action.photo,
                step: 2
            }
        case 'REGISTRY_STEP_TWO':
            return {
                ...state,
                address: action.address,
                number: action.number, 
                postalCode: action.postalCode,
                complement: action.complement,
                city: action.city,
                addressState: action.addressState, 
                country: action.country,
                step: 3
            }
        case 'REGISTRY_STEP_THREE':
            return {
                ...state,
                facebook: action.facebook,
                instagram: action.instagram, 
                linkedin: action.linkedin,
                twitter: action.twitter,
                youtube: action.youtube,
                tiktok: action.tiktok, 
                step: 4
            }
        case 'REGISTRY_STEP_FOUR':
            return {
                ...state,
                aboutMe: action.aboutMe,
                skills: action.skills,
                niches: action.niches,
                step: 5
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
