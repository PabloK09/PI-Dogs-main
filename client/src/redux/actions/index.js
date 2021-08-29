import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { GET_BREEDS } from './types';


export const getBreeds = () => {
    return (dispatch) => {
        return axios.get(BASE_URL)
        .then((breeds)=> {
            dispatch({
                type: GET_BREEDS,
                payload: breeds.data
            })
        })
    }
}