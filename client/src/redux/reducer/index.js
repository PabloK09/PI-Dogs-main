import {
  GET_BREEDS,
  GET_BREED_ID,
  GET_TEMPERAMENT,
  GET_BREED_NAME,
  FILTER_TEMPERAMENTS,
  FILTER_ORDER_NAME,
  FILTER_ORDER_WEIGHT,
} from "../actions/types";

const initialState = {
  breeds: [],
  breedId: undefined,
  temperament: [],
  breedsFilter: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
      };

    case GET_BREED_ID:
      return {
        ...state,
        breedId: action.payload,
      };

    case GET_TEMPERAMENT:
      return {
        ...state,
        temperament: action.payload,
      };

    case GET_BREED_NAME:
      if (state.breedsFilter.length) {
        return {
          ...state,
          breedsFilter: action.payload,
        };
      } else {
        return {
          ...state,
          breeds: action.payload,
        };
      }

    case FILTER_TEMPERAMENTS:
      return {
        ...state,
        breedsFilter: action.payload,
      };

    case FILTER_ORDER_NAME:
      if (state.breedsFilter?.length) {
        let sortedBreeds =
          action.payload === "AZ"
            ? state.breedsFilter?.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              })
            : state.breedsFilter?.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
              });
        return {
          ...state,
          breedsFilter: sortedBreeds,
        };
      } else {
        let sortedBreeds =
          action.payload === "AZ"
            ? state.breeds.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              })
            : state.breeds.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
              });
        return {
          ...state,
          breeds: sortedBreeds,
        };
      }

    case FILTER_ORDER_WEIGHT:
      if (state.breedsFilter?.length) {
        let sortedBreeds =
          action.payload === "WH"
            ? state.breedsFilter
                ?.filter((breed) => !breed.weight.includes(NaN))
                .sort(function (a, b) {
                  return b.weight?.split(" - ")[1] - a.weight?.split(" - ")[1];
                })
            : state.breedsFilter
                ?.filter((breed) => !breed.weight.includes(NaN))
                .sort(function (a, b) {
                  return a.weight?.split(" - ")[0] - b.weight?.split(" - ")[0];
                });
        return {
          ...state,
          breedsFilter: sortedBreeds,
        };
      } else {
        let sortedBreeds =
          action.payload === "WH"
            ? state.breeds
                .filter((breed) => !breed.weight.includes(NaN))
                .sort(function (a, b) {
                  return b.weight?.split(" - ")[1] - a.weight?.split(" - ")[1];
                })
            : state.breeds
                .filter((breed) => !breed.weight.includes(NaN))
                .sort(function (a, b) {
                  return a.weight?.split(" - ")[0] - b.weight?.split(" - ")[0];
                });
        return {
          ...state,
          breeds: sortedBreeds,
        };
      }
    default:
      return state;
  }
}

export default rootReducer;
