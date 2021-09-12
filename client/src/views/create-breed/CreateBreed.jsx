/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { POST_URL } from "../../utils/constants";
import { getBreeds, getTemperament } from "../../redux/actions/index";
import styles from "./CreateBreed.module.css";
import SearchBarr from "../../components/searchbar/SearchBar";
import { SiDatadog } from "react-icons/si";
import { FaBone, FaWeightHanging } from "react-icons/fa";
import { GiBodyHeight, GiLifeBar } from "react-icons/gi";
import { RiImageAddFill } from "react-icons/ri";

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
  const [select, setSelect] = useState("")
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
      errors.name = "Minimo 3 Caracteres";
    } else if (breeds.name.length > 30) {
      errors.name = "Maximo 30 Caracteres";
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
      if (state.weightMin.length && state.weightMax.length) {
        state.weight = state.weightMin.concat(state.weightMax);
      }
      if (state.heightMin.length && state.heightMax.length) {
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
    setSelect(true)
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

  function handleSelectReset(e) {
    e.preventDefault();
    setSelect(true)
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
      <div className={styles.divFather}>
        <div
          className={styles.containFormFather}
          style={{
            backgroundImage: `url(${breeds.image})`
          }}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.divContaineresForm}>
              <h3 className={styles.h3Create}>My BFF</h3>
              <div className={styles.containerForm2}>
                <div className={styles.containerIndv}>
                  {/* <label htmlFor="name">Name</label> */}
                  <div className={styles.iconInput}>
                    <FaBone className={styles.iconSize} />
                  </div>
                  <div className={styles.inputAndError}>
                    <input
                      type="text"
                      name="name"
                      value={breeds.name}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      placeholder="Define a name"
                      className={styles.inputCreate}
                    />
                    {errors.name && (
                      <span className={styles.errorInput}>{errors.name}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.containerForm2}>
                <div className={styles.containerIndv}>
                  {/* <label htmlFor="weightMin">WeightMin</label> */}
                  <div className={styles.iconInput2}>
                    <FaWeightHanging className={styles.iconSize} />
                  </div>
                  <div className={styles.inputAndError}>
                    <input
                      type="number"
                      name="weightMin"
                      value={breeds.weightMin}
                      onChange={handleChangeArray}
                      required
                      autoComplete="off"
                      placeholder="Define a weight min"
                      className={styles.inputCreate}
                    />
                    {errors.weightMin && (
                      <span className={styles.errorInput}>
                        {errors.weightMin}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.containerIndv}>
                  {/* <label htmlFor="weightMax">weightMax</label> */}
                  <div className={styles.iconInput2}></div>
                  <div className={styles.inputAndError}>
                    <input
                      type="number"
                      name="weightMax"
                      value={breeds.weightMax}
                      onChange={handleChangeArray}
                      required
                      autoComplete="off"
                      placeholder="Define a weight max"
                      className={styles.inputCreate}
                    />
                    {errors.weightMax && (
                      <span className={styles.errorInput}>
                        {errors.weightMax}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.containerForm2}>
                <div className={styles.containerIndv}>
                  {/* <label htmlFor="heightMin">heightMin</label> */}
                  <div className={styles.iconInput2}>
                    <GiBodyHeight className={styles.iconSize} />
                  </div>
                  <div className={styles.inputAndError}>
                    <input
                      type="number"
                      name="heightMin"
                      value={breeds.heightMin}
                      onChange={handleChangeArray}
                      required
                      autoComplete="off"
                      placeholder="Define a height min"
                      className={styles.inputCreate}
                    />
                    {errors.heightMin && (
                      <span className={styles.errorInput}>
                        {errors.heightMin}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.containerIndv}>
                  {/* <label htmlFor="heightMax">heightMax</label> */}
                  <div className={styles.iconInput2}></div>
                  <div className={styles.inputAndError}>
                    <input
                      type="number"
                      name="heightMax"
                      value={breeds.heightMax}
                      onChange={handleChangeArray}
                      required
                      autoComplete="off"
                      placeholder="Define a height max"
                      className={styles.inputCreate}
                    />
                    {errors.heightMax && (
                      <span className={styles.errorInput}>
                        {errors.heightMax}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.containerForm2}>
                <div className={styles.containerIndv}>
                  <div className={styles.iconInput2}>
                    <GiLifeBar className={styles.iconSize} />
                  </div>
                  {/* <label htmlFor="life_spanMin">life_spanMin</label> */}
                  <div className={styles.inputAndError}>
                    <input
                      type="number"
                      name="life_spanMin"
                      value={breeds.life_spanMin}
                      onChange={handleChangeArray}
                      autoComplete="off"
                      placeholder="Define a life span min"
                      className={styles.inputCreate}
                    />
                    {errors.life_spanMin && (
                      <span className={styles.errorInput}>
                        {errors.life_spanMin}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.containerIndv}>
                  {/* <label htmlFor="life_spanMax">life_spanMaxn</label> */}
                  <div className={styles.iconInput2}></div>
                  <div className={styles.inputAndError}>
                    <input
                      type="number"
                      name="life_spanMax"
                      value={breeds.life_spanMax}
                      onChange={handleChangeArray}
                      autoComplete="off"
                      placeholder="Define a life span max"
                      className={styles.inputCreate}
                    />
                    {errors.life_spanMax && (
                      <span className={styles.errorInput}>
                        {errors.life_spanMax}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.containerForm2}>
                <div className={styles.containerIndv}>
                  <div className={styles.iconInput}>
                    <RiImageAddFill className={styles.iconSize} />
                  </div>
                  {/* <label htmlFor="image">image</label> */}
                  <div className={styles.inputAndError}>
                    <input
                      type="url"
                      name="image"
                      value={breeds.image}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Choose an image"
                      className={styles.inputCreate}
                    />
                    {errors.image && (
                      <span className={styles.errorInput}> {errors.image}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.containerSel}>
                {/* <label htmlFor="temperament-select">Choose Temperament: </label> */}
                <div className={styles.containerIndvSel}>
                  <select
                    name="temperamentPrev"
                    value={[breeds.temperamentPrev]}
                    onClick={handleSelectReset}
                    onChange={(e) => handleChangeTemp(e)}
                    className={styles.tempSelected}
                    key="selectTempsCreate"
                  >
                    <option value="All" key="All" selected={select}>
                      Choose Temperament
                    </option>
                    {temperamentState?.map((temp) => (
                      <option value={temp.id} key={temp.id}>
                        {temp.name}
                      </option>
                    ))}
                  </select>
                  <div className={styles.temps}>
                    {breeds.temperament ? (
                      <>
                        {array.map((temp) => (
                          <div className={styles.tempsChild}>
                            <button
                              className={(styles.noselect, styles.temp)}
                              key={temp.name}
                              id={temp.name}
                              value={temp.id}
                              onClick={() =>
                                handleOnClose(
                                  document.getElementById(`${temp.name}`).value
                                )
                              }
                            >
                              <span className={styles.text}>{temp.name}</span>
                              <span className={styles.icon}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                                </svg>
                              </span>
                            </button>
                          </div>
                        ))}
                      </>
                    ) : (
                      false
                    )}
                  </div>
                </div>
                {errors.temperament && breeds.temperament.length > 5 && (
                  <span className={styles.errorInput}>
                    {errors.temperament}
                  </span>
                )}
              </div>
              <button
                className={styles.cta}
                type="submit"
                disabled={Object.keys(errors).length > 0 ? true : false}
              >
                <span className={styles.spanSubmit}>Create BFF</span>
                <svg
                  className={styles.svgSubmit}
                  width="13px"
                  height="10px"
                  viewBox="0 0 13 10"
                >
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </div>
          </form>
          <div className={styles.Preview}>
            <div className={styles.containerPreview}>
              <div className={styles.containerStatus}>
                <div className={styles.titlesPreview}>
                  <h3 className={styles.h3Preview}>Preview</h3>
                  {breeds.name ? (
                    <h3 className={styles.h3PreviewN}>{breeds.name}</h3>
                  ) : (
                    <h3 className={styles.h3PreviewN}>Name</h3>
                  )}
                </div>
                {breeds.image ? (
                  <div className={styles.divImgStatus}>
                    <img
                      src={breeds.image}
                      alt={breeds.name}
                      className={styles.imgStatus}
                    />
                  </div>
                ) : (
                  <div className={styles.divImgStatus}>
                    {/* <img
                    src={imageUpload}
                    alt="Upload a imageDog"
                    className={styles.imgStatus}
                  /> */}
                    <SiDatadog className={styles.iconPreview} />
                  </div>
                )}
                <div className={styles.divUlPreview}>
                  {breeds.weight ? (
                    <li className={styles.liWHL}>
                      <span>
                        <strong>Weight: </strong>
                        {breeds.weightMin + " - "}
                      </span>
                      <span>{breeds.weightMax + " kg"}</span>
                    </li>
                  ) : (
                    <li className={styles.liPreview}></li>
                  )}
                  {breeds.height ? (
                    <li className={styles.liWHL}>
                      <span>
                        <strong>Height: </strong>
                        {breeds.heightMin + " - "}
                      </span>
                      <span>{breeds.heightMax + " cm"}</span>
                    </li>
                  ) : (
                    <li className={styles.liPreview}></li>
                  )}
                  {breeds.life_span ? (
                    <li className={styles.liWHL}>
                      <span>
                        <strong>Life Span: </strong>
                        {breeds.life_spanMin + " - "}
                      </span>
                      <span>{breeds.life_spanMax + " years"}</span>
                    </li>
                  ) : (
                    <li className={styles.liPreview}></li>
                  )}
                </div>
                <div>
                  {breeds.temperament.length ? (
                    <strong>Temperaments</strong>
                  ) : (
                    false
                  )}
                  <div className={styles.divTempPreview}>
                    {breeds.temperament.length ? (
                      array.map((temp) => (
                        <li className={styles.liTempPreview}>{temp.name}</li>
                      ))
                    ) : (
                      <div className={styles.divTempPreview}>
                        <li className={styles.liPreview}></li>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
