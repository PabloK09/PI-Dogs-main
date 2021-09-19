import axios from 'axios';
import { BASE_URL, SEARH_ID, URL_TEMPERAMENT } from '../../utils/constants';
import { GET_BREEDS, GET_BREED_ID, GET_TEMPERAMENT, GET_BREED_NAME, FILTER_TEMPERAMENTS, FILTER_ORDER_NAME, FILTER_ORDER_WEIGHT, FILTER_NAME, FILTER_DATA, ADD_BREED_FAVORITE, REMOVE_BREED_FAVORITE} from './types';

export const getBreeds = () => {
    return (dispatch) => {
        axios.get(BASE_URL)
        .then((breeds)=> {
            dispatch({
                type: GET_BREEDS,
                payload: breeds.data
            })
        })
        .catch((error)=> {
            console.log(error);
        })
    }
}

export const getBreedsName = (name) => {
    return (dispatch) => {
        axios.get(BASE_URL+"?name=" + name)
        .then((response)=> response.data)
        .then((breedsName)=> {
            dispatch({
                type: GET_BREED_NAME,
                payload: breedsName
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
        axios.get(URL_TEMPERAMENT)
        .then((temperament)=> {
            dispatch({
                type: GET_TEMPERAMENT,
                payload: temperament.data
            })
        })
        .catch((error)=> {
            console.log(error);
        })
    }
}

export const addBreedFavourites = (payload) => {
    return (dispatch) => {
        dispatch({type: ADD_BREED_FAVORITE, payload,})
        axios.put(SEARH_ID + payload.id, {favourite: true})
    }
}

export const removeBreedFavorite = (payload) => {
    return (dispatch) =>{
        dispatch({type: REMOVE_BREED_FAVORITE, payload})
        axios.put(SEARH_ID + payload.id, {favourite: false})
    }
}

export const getBreedId =  (idBreed) => {
    return (dispatch) => {
         axios.get(SEARH_ID + idBreed)
        .then((breedId)=>{
            dispatch({
                type: GET_BREED_ID,
                payload: breedId.data
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
