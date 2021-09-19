import {
  GET_BREEDS,
  GET_BREED_ID,
  GET_TEMPERAMENT,
  GET_BREED_NAME,
  FILTER_TEMPERAMENTS,
  FILTER_ORDER_NAME,
  FILTER_ORDER_WEIGHT,
  FILTER_NAME,
  FILTER_DATA,
  ADD_BREED_FAVORITE,
  REMOVE_BREED_FAVORITE,
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
        breedsFilter: action.payload,
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
            breedsFilter: [...copyName].slice(),
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
                  !breed.weight.includes("NaN") &&
                  breed.weight.split(" - ").length > 1
              )
              .sort(function (a, b) {
                return b.weight?.split(" - ")[1] - a.weight?.split(" - ")[1];
              })
          : state.breedsFilter
              .filter(
                (breed) =>
                  !breed.weight.includes(false) &&
                  !breed.weight.includes("NaN") &&
                  breed.weight.split(" - ").length > 1
              )
              .sort(function (a, b) {
                return a.weight?.split(" - ")[0] - b.weight?.split(" - ")[0];
              });
      return {
        ...state,
        breedsFilter: sortedBreedsW,
      };

      case ADD_BREED_FAVORITE:
      let favorito = action.payload;
      favorito.fav = true;
      return {
        ...state,
      };

    case REMOVE_BREED_FAVORITE:
      let favoritoR = action.payload;
      favoritoR.fav = false;
      return {
        ...state,
        breeds: state.breeds.filter(
          (el) => el.id !== action.payload.id
        ),
      };

    case FILTER_DATA:
      let copyData = [];
      if (action.payload === "API") {
        if (state.breedsFilter.length) {
          copyData = [...state.breedsFilter];
          copyData = copyData.filter((breed) => {
            return breed.created === false;
          });
          return {
            ...state,
            breedsFilter: [...copyData],
          };
        } else {
          copyData = [...state.breeds];
          copyData = copyData.filter((breed) => {
            return breed.created === false;
          });
          return {
            ...state,
            breedsFilter: [...copyData],
          };
        }
      }
      if (action.payload === "DB") {
        if (state.breedsFilter.length) {
          copyData = [...state.breedsFilter];
          copyData = copyData.filter((breed) => {
            return breed.created === true;
          });
          return {
            ...state,
            breedsFilter: [...copyData],
          };
        } else {
          copyData = [...state.breeds];
          copyData = copyData.filter((breed) => {
            return breed.created === true;
          });
          return {
            ...state,
            breedsFilter: [...copyData],
          };
        }
      }
      if (action.payload === "CLEAR") {
        return {
          ...state,
          breedsFilter: [...state.breeds],
        };
      }
      break;

    default:
      return state;
  }
}

export default rootReducer;
