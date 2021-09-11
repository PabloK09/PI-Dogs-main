import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { POST_URL } from "../../utils/constants";
import { getBreeds, getTemperament } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import styles from "./CreateBreed.module.css";
import SearchBarr from "../../components/searchbar/SearchBar";

export default function CreateBreed() {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [errors, setErrors] = useState({});
  const [breeds, setBreeds] = useState({
    name: "",
    weightMin: [],
    weightMax: [],
    heightMin: [],
    heightMax: [],
    life_spanMin: [],
    life_spanMax: [],
    image: "",
    temperament: [],
    temperamentPrev: [],
  });

  const temperamentState = useSelector((state) => state.temperament);
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  function validate(breeds) {
    let errors = {};
    if (!breeds.name) {
      errors.name = "Se requiere un nombre";
    } else if (!/^[A-Za-z\s]+$/.test(breeds.name)) {
      errors.name = "Se requiere un nombre";
    } else if (breeds.name.length < 3) {
      errors.name = "Se requiere un nombre";
    }
    if (!breeds.weightMin) {
      errors.weightMin = "Se requiere un peso minimo";
    } else if (!/^\d+$/.test(breeds.weightMin)) {
      errors.weightMin = "Se requiere un peso minimo";
    } else if (breeds.weightMin < 0) {
      errors.weightMin = "Muy liviano min 1kg";
    }
    if (!breeds.weightMax) {
      errors.weightMax = "Se requiere un peso maximo";
    } else if (breeds.weightMin[0] >= breeds.weightMax[0]) {
      errors.weightMax = "Se requiere un peso maximo";
    } else if (!/^\d+$/.test(breeds.weightMax)) {
      errors.weightMax = "Se requiere un peso maximo";
    } else if (breeds.weightMax > 110) {
      errors.weightMax = "Demasiado pesado max 110kg";
    }
    if (!breeds.heightMin) {
      errors.heightMin = "Se requiere una altura minima";
    } else if (!/^\d+$/.test(breeds.heightMin)) {
      errors.heightMin = "Se requiere una altura minima";
    } else if (breeds.heightMin < 9) {
      errors.heightMin = "Demasiado bajo min 9cm";
    }
    if (!breeds.heightMax) {
      errors.heightMax = "Se requiere una altura maxima";
    } else if (breeds.heightMin[0] >= breeds.heightMax[0]) {
      errors.heightMax = "Se requiere una altura maxima";
    } else if (!/^\d+$/.test(breeds.heightMax)) {
      errors.heightMax = "Se requiere una altura maxima";
    } else if (breeds.heightMax > 130) {
      errors.heightMax = "Demasiado alto max 130cm";
    }
    if (breeds.life_spanMin.length) {
      if (!/^\d+$/.test(breeds.life_spanMin)) {
        errors.life_spanMin = "Se requiere life_spanMin";
      } else if (breeds.life_spanMin < 0) {
        errors.life_spanMin = "Minimo 1 año";
      }
    }
    if (breeds.life_spanMax.length) {
      if (breeds.life_spanMin[0] >= breeds.life_spanMax[0]) {
        errors.life_spanMax = "Se requiere life_spanMax";
      } else if (!/^\d+$/.test(breeds.life_spanMax)) {
        errors.life_spanMax = "Se requiere life_spanMax";
      } else if (breeds.life_spanMax > 21) {
        errors.life_spanMin = "Maximo 21 años";
      }
    }
    if (breeds.image) {
      if (
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(
          breeds.image
        )
      ) {
        errors.image = "Url invalida";
      }
    }
    if (breeds.temperament.length > 5) {
      errors.temperament = "Maximo 5 temperaments";
    }
    return errors;
  }

  let filtro = [];
  let array = [];
  if (breeds.temperament.length) {
    for (let i = 0; i < breeds.temperament?.length; i++) {
      filtro = temperamentState?.filter(
        (temp) => temp.id === breeds.temperament[i]
      );
      array.push(...filtro);
    }
  }

  function handleOnClose(e) {
    setBreeds((prevData) => {
      let state = {
        ...prevData,
      };
      state.temperament = state.temperament.filter((temp) => temp !== e);
      return state;
    });
  }

  function handleChange(e) {
    setBreeds((prevData) => {
      const state = {
        ...prevData,
        [e.target.name]: e.target.value,
      };
      setErrors(
        validate({
          ...breeds,
          [e.target.name]: e.target.value,
        })
      );
      if (state.name) {
        state.name = state.name[0].toUpperCase() + state.name.substring(1);
      }
      return state;
    });
  }

  function handleChangeArray(e) {
    setBreeds((prevData) => {
      let state = {
        ...prevData,
        [e.target.name]: [parseInt(e.target.value)],
      };
      setErrors(
        validate({
          ...breeds,
          [e.target.name]: [parseInt(e.target.value)],
        })
      );
      if (
        state.weightMin.length &&
        state.weightMax.length &&
        state.heightMin.length &&
        state.heightMax.length
      ) {
        state.weight = state.weightMin.concat(state.weightMax);
        state.height = state.heightMin.concat(state.heightMax);
      }
      if (state.life_spanMin.length && state.life_spanMax.length) {
        state.life_span = state.life_spanMin.concat(state.life_spanMax);
      } else if (
        state.life_spanMin.includes(false) ||
        state.life_spanMax.includes(false)
      ) {
        state.life_span = [];
      }
      return state;
    });
  }

  function handleChangeTemp(e) {
    setBreeds((prevData) => {
      let state = {
        ...prevData,
        [e.target.name]: e.target.value,
      };
      setErrors(
        validate({
          ...breeds,
          [e.target.name]: e.target.value,
        })
      );
      if (state.temperamentPrev) {
        if (!state.temperament.includes(state.temperamentPrev)) {
          state.temperament?.push(state.temperamentPrev);
        }
      }
      return state;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(getBreeds()); //creo que no hace falta
    await axios
      .post(POST_URL, breeds)
      .then((response) => {
        alert("The breed was added successfully🐶");
        dispatch(getBreeds()); //no se si hace falta
        // push(`/home/breed/${response.data[0].breedId}`)
        push(`/home/`);
      })
      .catch((err) => {
        alert("The breed cants created😰");
      });
  }

  return (
    <div>
      <SearchBarr />
      <div className={styles.containerForm}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={breeds.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {errors.name && (
              <span className={styles.errorInput}>{errors.name}</span>
            )}
          </div>
          <div className={styles.containerForm}>
            <label htmlFor="weightMin">WeightMin</label>
            <input
              type="number"
              name="weightMin"
              value={breeds.weightMin}
              onChange={handleChangeArray}
              required
              autoComplete="off"
            />
            {errors.weightMin && (
              <span className={styles.errorInput}> {errors.weightMin}</span>
            )}
          </div>
          <div className={styles.containerForm}>
            <label htmlFor="heightMin">heightMin</label>
            <input
              type="number"
              name="heightMin"
              value={breeds.heightMin}
              onChange={handleChangeArray}
              required
              autoComplete="off"
            />
            {errors.heightMin && (
              <span className={styles.errorInput}> {errors.heightMin}</span>
            )}
          </div>
          <div className={styles.containerForm}>
            <label htmlFor="life_spanMin">life_spanMin</label>
            <input
              type="number"
              name="life_spanMin"
              value={breeds.life_spanMin}
              onChange={handleChangeArray}
              autoComplete="off"
            />
            {errors.life_spanMin && (
              <span className={styles.errorInput}> {errors.life_spanMin}</span>
            )}
          </div>
          <div className={styles.containerForm}>
            <label htmlFor="weightMax">weightMax</label>
            <input
              type="number"
              name="weightMax"
              value={breeds.weightMax}
              onChange={handleChangeArray}
              required
              autoComplete="off"
            />
            {errors.weightMax && (
              <span className={styles.errorInput}> {errors.weightMax}</span>
            )}
          </div>
          <div className={styles.containerForm}>
            <label htmlFor="heightMax">heightMax</label>
            <input
              type="number"
              name="heightMax"
              value={breeds.heightMax}
              onChange={handleChangeArray}
              required
              autoComplete="off"
            />
            {errors.heightMax && (
              <span className={styles.errorInput}> {errors.heightMax}</span>
            )}
          </div>
          <div className={styles.containerForm}>
            <label htmlFor="life_spanMax">life_spanMaxn</label>
            <input
              type="number"
              name="life_spanMax"
              value={breeds.life_spanMax}
              onChange={handleChangeArray}
              autoComplete="off"
            />
            {errors.life_spanMax && (
              <span className={styles.errorInput}> {errors.life_spanMax}</span>
            )}
          </div>
          <div className={styles.containerForm}>
            <label htmlFor="image">image</label>
            <input
              type="url"
              name="image"
              value={breeds.image}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.image && (
              <span className={styles.errorInput}> {errors.image}</span>
            )}
          </div>
          <div className={styles.containerForm}>
            <label htmlFor="temperament-select">Choose Temperament: </label>
            <select
              name="temperamentPrev"
              value={[breeds.temperamentPrev]}
              onChange={(e) => handleChangeTemp(e)}
            >
              {temperamentState?.map((temp) => (
                <option value={temp.id} key={temp.id}>
                  {temp.name}
                </option>
              ))}
            </select>
            {errors.temperament && breeds.temperament.length > 5 && (
              <span className={styles.errorInput}> {errors.temperament}</span>
            )}
          </div>
          {breeds.temperament ? (
            <>
              {array.map((temp) => (
                <ul key={temp.id}>
                  <li key={temp.id}>
                    {temp.name}

                    <button
                      key={temp.name}
                      id={temp.name}
                      value={temp.id}
                      onClick={() =>
                        handleOnClose(
                          document.getElementById(`${temp.name}`).value
                        )
                      }
                    >
                      X
                    </button>
                  </li>
                </ul>
              ))}
            </>
          ) : (
            false
          )}

          <input
            type="submit"
            disabled={Object.keys(errors).length > 0 ? true : false}
          />
        </form>
        <div className={styles.containerPreview}>
          {breeds.name ? <h3>{breeds.name}</h3> : false}
          {breeds.image ? (
            <div className={styles.divImgStatus}>
              <img
                src={breeds.image}
                alt={breeds.name}
                className={styles.imgStatus}
              />
            </div>
          ) : (
            false
          )}

          <div className={styles.containerStatus}>
            {breeds.weight ? (
              <li>
                <span>{breeds.weightMin}kg</span>
                <span> - {breeds.weightMax}kg</span>
              </li>
            ) : (
              false
            )}
            {breeds.heigh ? (
              <li>
                <span>{breeds.heightMin}cm</span>
                <span> - {breeds.heightMax}cm</span>
              </li>
            ) : (
              false
            )}
            {breeds.life_span ? (
              <li>
                <span>{breeds.life_spanMin}years</span>
                <span> - {breeds.life_spanMax}years</span>
              </li>
            ) : (
              false
            )}
            {breeds.temperament
              ? array.map((temp) => <li>{temp.name}</li>)
              : false}
          </div>
        </div>
      </div>
    </div>
  );
}
