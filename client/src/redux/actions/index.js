import axios from 'axios';
import { BASE_URL, SEARH_ID, URL_TEMPERAMENT } from '../../utils/constants';
import { GET_BREEDS, GET_BREED_ID, GET_TEMPERAMENT, GET_BREED_NAME, FILTER_TEMPERAMENTS, FILTER_ORDER_NAME, FILTER_ORDER_WEIGHT, SET_LOADING, FILTER_NAME, FILTER_DATA} from './types';

export const getBreeds = () => {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        axios.get(BASE_URL)
        .then((breeds)=> {
            dispatch({
                type: GET_BREEDS,
                payload: breeds.data
            })
            dispatch({
                type: SET_LOADING,
                payload: false
            })
        })
    }
}

export const getBreedsName = (name) => {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        axios.get(BASE_URL+"?name=" + name)
        .then((response)=> response.data)
        .then((breedsName)=> {
            dispatch({
                type: GET_BREED_NAME,
                payload: breedsName
            })
            dispatch({
                type: SET_LOADING,
                payload: false
            })
        })
        .catch((error)=>{
            if(error.message === "La raza no existe"){
                dispatch({
                    type: GET_BREED_NAME,
                        payload: null
                })
            }
            if(error.response?.status){
                if(error.response.status === 404){
                    dispatch({
                        type: GET_BREED_NAME,
                        payload: null
                    })
                }
            }
            alert("Breaakk 🦴")
            
        })
    }
}

export const getTemperament =  () => {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        axios.get(URL_TEMPERAMENT)
        .then((temperament)=> {
            dispatch({
                type: GET_TEMPERAMENT,
                payload: temperament.data
            })
            dispatch({
                type: SET_LOADING,
                payload: false
            })
        })
    }
}

export const getBreedId =  (idBreed) => {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
         axios.get(SEARH_ID + idBreed)
        .then((breedId)=>{
            dispatch({
                type: GET_BREED_ID,
                payload: breedId.data
            })
            dispatch({
                type: SET_LOADING,
                payload: false
            })
        })
        .catch((error)=>{
            if(error.response?.status){
                if(error.response.status === 404){
                    dispatch({
                        type: GET_BREED_ID,
                        payload: null
                    })
                }
            }
            alert("Breaakk 🦴")
        })
    }
}

export const clearBreed =  () => {
    return {type: GET_BREED_ID, payload: undefined}
}

export const filterTemperaments = (payload) => {
    return {type: FILTER_TEMPERAMENTS, payload}
}

export const orderByBreedName = (payload) => {
    return {type: FILTER_ORDER_NAME, payload}
}

export const orderByBreedWeight = (payload) => {
    return {type: FILTER_ORDER_WEIGHT, payload}
}

export const searchBreedName = (payload) => {
    return {type: FILTER_NAME, payload}
}

export const orderByBreedData = (payload) => {
    return {type: FILTER_DATA, payload}
}