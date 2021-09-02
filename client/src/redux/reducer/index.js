import {GET_BREEDS, GET_BREED_ID, GET_TEMPERAMENT, GET_BREED_NAME} from '../actions/types'

const initialState = {
    breeds: [],
    breedId: undefined,
    temperament: []
}

function rootReducer(state= initialState, action) {
    switch(action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload
            }
        
        case GET_BREED_ID:
            return {
                ...state,
                breedId: action.payload
            }

        case GET_TEMPERAMENT:
            return {
                ...state,
                temperament: action.payload
            }

        case GET_BREED_NAME:
            return {
                ...state,
                breeds: action.payload,
                
            }
        default: return state
    }
}

export default rootReducer
