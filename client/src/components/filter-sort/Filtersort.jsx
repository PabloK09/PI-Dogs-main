/*eslint-disable-next-line*/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterTemperaments,
  orderByBreedName,
  orderByBreedWeight,
  orderByBreedData,
} from "../../redux/actions/index";
import styles from "./Filtersort.module.css";
import {
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
  FaWeightHanging,
  FaFeather,
  FaTrash
} from "react-icons/fa";

export default function FilterSort({ setCurrentPage, setOrden, listaTemp, setListaTemp }) {
  const dispatch = useDispatch();
  const temperamentState = useSelector((state) => state.temperament);

  const [select, setSelect] = useState("")

  useEffect(() => {
  }, [dispatch, setListaTemp]);

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByBreedName(e.target.name));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByBreedWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortDataBreed(e) {
    e.preventDefault();
    dispatch(orderByBreedData(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
    if(e.target.value === "CLEAR"){
      setListaTemp([]);
      setCurrentPage(1);
      setOrden(`Filtrado`);
    }
  }

  function handleFilterTemp(e) {
    e.preventDefault();
    if(!listaTemp.includes(e.target.value)){
      dispatch(filterTemperaments(e.target.value));
      setListaTemp([...listaTemp, e.target.value]);
      setSelect(false)
      setCurrentPage(1);
      setOrden(`Filtrado`);
    }
    if (e.target.value === "All") {
      setListaTemp([]);
      setCurrentPage(1);
      setOrden(`Filtrado`);
    } 
  }

  function handleOnClose(e) {
    let filterTemp = listaTemp.filter((temp) => {
      return temp !== e;
    });
    setListaTemp(
      listaTemp.filter((temp) => {
        return temp !== e;
      })
    );
    if (listaTemp.length > 1) {
      dispatch(filterTemperaments("All"));
      for (let i = 0; i < listaTemp?.length - 1; i++) {
        dispatch(filterTemperaments(filterTemp[i]));
      }
      setCurrentPage(1);
      setOrden(`Filtrado`);
    } else {
      dispatch(filterTemperaments("All"));
      setCurrentPage(1);
      setOrden(`Filtrado`);
    }
  }

  function handleSelectReset(e) {
    e.preventDefault();
    setSelect(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.divFilterContainer}>
        <div className={styles.filterTemp} key="rompeHuevos">
          <select
            onChange={(e) => handleFilterTemp(e)}
            onClick={handleSelectReset}
            className={styles.tempSelected}
            defaultValue={"selectedFilter"}
          >
            <option value="selectedFilter" disabled key="selectedFilter" 
            selected={select}>
              Filter Temperaments
            </option>
            {temperamentState?.map((temp) => (
              <option  key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.divBtn}>
          <button
            className={styles.orderBtn}
            name="API"
            value="API"
            onClick={handleSortDataBreed}
          >
            API
          </button>
          <button
            className={styles.orderBtn}
            name="DB"
            value="DB"
            onClick={handleSortDataBreed}
          >
            DB
          </button>
          <button
            name="AZ"
            value="AZ"
            onClick={handleSortName}
            className={styles.orderBtn}
          >
            <FaSortAlphaDown className={styles.orderIcon} />
          </button>
          <button
            name="ZA"
            value="ZA"
            onClick={handleSortName}
            className={styles.orderBtn}
          >
            <FaSortAlphaUpAlt className={styles.orderIcon} />
          </button>
          <button
            name="WL"
            value="WL"
            onClick={handleSortWeight}
            className={styles.orderBtn}
          >
            <FaFeather className={styles.orderIcon} />
          </button>
          <button
            name="WH"
            value="WH"
            onClick={handleSortWeight}
            className={styles.orderBtn}
          >
            <FaWeightHanging className={styles.orderIcon} />
          </button>
          <button
          name="CLEAR"
          value="CLEAR"
          onClick={handleSortDataBreed}
          className={styles.orderBtn}
          >
            <FaTrash className={styles.orderIcon} />
          </button>
        </div>
      </div>
      <div className={styles.temps} key="temps_select">
        {listaTemp
          ? listaTemp.map((temp) => (
              <div key={temp}>
                {temp !== "All" ? (
                  
                  <div>
                    <button
                      className={(styles.noselect, styles.temp)}
                      id={temp}
                      value={temp}
                      onClick={() =>
                      handleOnClose(document.getElementById(`${temp}`).value)
                      }
                      >
                      <span className={styles.text} key="A">{temp}</span>
                      <span className={styles.icon} key="B">
                        <svg
                        key="C"
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
                  
                ) : (
                  false
                )}
              </div>
            ))
          : false}
      </div>
    </div>
  );
}
