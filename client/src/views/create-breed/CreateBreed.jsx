/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { POST_URL } from "../../utils/constants";
import { getTemperament, getBreeds } from "../../redux/actions/index";
import styles from "./CreateBreed.module.css";
import SearchBarr from "../../components/searchbar/Searchbar";
import { SiDatadog } from "react-icons/si";
import { FaBone, FaWeightHanging } from "react-icons/fa";
import { GiBodyHeight, GiLifeBar } from "react-icons/gi";
import { RiImageAddFill } from "react-icons/ri";
import validate from "../../utils/validate"

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
    temperaments: [],
    temperamentPrev: [],
  });

  const temperamentState = useSelector((state) => state.temperament);
  const [select, setSelect] = useState(true);
  useEffect(() => {
    // dispatch(getBreeds());
    return () => dispatch(getBreeds());
  }, [dispatch]);

  let filtro = [];
  let array = [];
  if (breeds.temperaments.length) {
    for (let i = 0; i < breeds.temperaments?.length; i++) {
      filtro = temperamentState?.filter(
        (temp) => temp.id === breeds.temperaments[i]
      );
      array.push(...filtro);
    }
  }

  function handleOnClose(e) {
    setBreeds((prevData) => {
      let state = {
        ...prevData,
      };
      state.temperaments = state.temperaments.filter((temp) => temp !== e);
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
    e.preventDefault();
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
        if (!state.temperaments.includes(state.temperamentPrev)) {
          state.temperaments?.push(state.temperamentPrev);
        }
      }
      return state;
    });
    setSelect(false);
  }

  function handleSelectReset(e) {
    e.preventDefault();
    setSelect(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(POST_URL, breeds)
      .then(() => {
        alert("The breed was added successfully🐶");
        push(`/home/`);
      })
      .catch((err) => {
        alert("The breed cants created😰");
        console.log(err)
      });
  }

  return (
    <div key="CreateDiv">
      <SearchBarr />
      <div className={styles.divFather}>
        <div className={styles.containFormFather}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.divContaineresForm}>
              <h3 className={styles.h3Create}>My BFF</h3>
              <div className={styles.containerForm2}>
                <div className={styles.containerIndv}>
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
                <div className={styles.containerIndvSel}>
                  <select
                    name="temperamentPrev"
                    defaultValue="ChooseTemperament"
                    onClick={handleSelectReset}
                    onChange={handleChangeTemp}
                    className={styles.tempSelected}
                    key="selectTempsCreate"
                  >
                    <option
                      disabled
                      value="ChooseTemperament"
                      selected={select}
                    >
                      Choose Temperament
                    </option>
                    {temperamentState?.map((temp) => (
                      <option value={temp.id} key={temp.id}>
                        {temp.name}
                      </option>
                    ))}
                  </select>
                  <div className={styles.temps} key="containerTempKey">
                    {breeds.temperaments ? (
                      <>
                        {array.map((temp) => (
                          <div className={styles.tempsChild} key={temp.name}>
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
                {errors.temperaments && breeds.temperaments.length > 5 && (
                  <span className={styles.errorInput}>
                    {errors.temperaments}
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
                  {breeds.temperaments.length ? (
                    <strong>Temperaments</strong>
                  ) : (
                    false
                  )}
                  <div className={styles.divTempPreview}>
                    {breeds.temperaments.length ? (
                      array.map((temp) => (
                        <li className={styles.liTempPreview} key={temp.name}>
                          {temp.name}
                        </li>
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
