import {
  GET_BREEDS,
  GET_BREED_ID,
  GET_TEMPERAMENT,
  GET_BREED_NAME,
  FILTER_TEMPERAMENTS,
  FILTER_ORDER_NAME,
  FILTER_ORDER_WEIGHT,
  SET_LOADING,
  FILTER_NAME,
  FILTER_DATA,
} from "../actions/types";

const initialState = {
  breeds: [],
  breedId: undefined,
  temperament: [],
  breedsFilter: [],
  breedsFind: [],
  isLoading: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        breedsFilter: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
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

    case FILTER_NAME:
      let copyName = [...state.breedsFilter];
      if (!action.payload.length) {
        return {
          ...state,
          breedsFilter: [...state.breeds],
        };
      } else {
        copyName = copyName.filter((breed) => {
          return breed.name?.includes(action.payload);
        });
        if (!copyName.length) {
          return {
            ...state,
            breedsFilter: [],
          };
        } else {
          return {
            ...state,
            breedsFilter: [...copyName],
          };
        }
      }

    case FILTER_TEMPERAMENTS:
      let copy = [...state.breedsFilter];
      if (action.payload === "All") {
        return {
          ...state,
          breedsFilter: [...state.breeds],
        };
      } else {
        copy = copy.filter((temp) => {
          return temp.temperament?.includes(action.payload);
        });
        if (!copy.length) {
          return {
            ...state,
            breedsFilter: [],
          };
        } else {
          return {
            ...state,
            breedsFilter: [...copy],
          };
        }
      }

    case FILTER_DATA:
      if (action.payload === "API") {
        let copyData = [];
        state.breedsFilter.map((breed) => {
          console.log("API", typeof breed.id === "string")
          return typeof breed.id === "string"
            ? (copyData = [...state.breeds])
            : (copyData = [...state.breedsFilter]);
        });
        copyData = copyData.filter((breed) => {
          return breed.id.toString().length < 10;
        });
        return {
          ...state,
          breedsFilter: [...copyData],
        };
      }
      if (action.payload === "DB") {
        let copyDataDB = [];
        state.breedsFilter.map((breed) => {
          console.log("DB", typeof breed.id === "string")
          return typeof breed.id === "string"
            ? (copyDataDB = [...state.breeds]) 
            : (copyDataDB = [...state.breedsFilter])
            
        });
        copyDataDB = copyDataDB.filter((breed) => {
          return breed.id.length > 10;
        });
        return {
          ...state,
          breedsFilter: [...copyDataDB],
        };
      }
      if(action.payload === "CLEAR"){
        return {
          ...state,
          breedsFilter: [...state.breeds],
        };
      }

    case FILTER_ORDER_NAME:
      let sortedBreedsN =
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
        breedsFilter: sortedBreedsN,
      };

    case FILTER_ORDER_WEIGHT:
      let sortedBreedsW =
        action.payload === "WH"
          ? state.breedsFilter
              .filter(
                (breed) =>
                  !breed.weight.includes(false) &&
                  breed.weight.split(" - ").length > 1
              )
              .sort(function (a, b) {
                return b.weight?.split(" - ")[1] - a.weight?.split(" - ")[1];
              })
          : state.breedsFilter
              .filter(
                (breed) =>
                  !breed.weight.includes(false) &&
                  breed.weight.split(" - ").length > 1
              )
              .sort(function (a, b) {
                return a.weight?.split(" - ")[0] - b.weight?.split(" - ")[0];
              });
      return {
        ...state,
        breedsFilter: sortedBreedsW,
      };
    default:
      return state;
  }
}

export default rootReducer;
