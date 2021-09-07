import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTemperament,
  filterTemperaments,
  orderByBreedName,
  orderByBreedWeight,
} from "../../redux/actions/index";
import styles from "./Filtersort.module.css";
import { HiChevronDown } from "react-icons/hi";

export default function FilterSort({ setCurrentPage, setOrden }) {
  const dispatch = useDispatch();
  const temperamentState = useSelector((state) => state.temperament);

  const [listaTemp, setListaTemp] = useState([]);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch, setListaTemp]);

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByBreedName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByBreedWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterTemp(e) {
    e.preventDefault();
    dispatch(filterTemperaments(e.target.value));
    if (e.target.value === "All") {
      setListaTemp([]);
      setCurrentPage(1);
      setOrden(`Filtrado`);
    } else {
      setListaTemp([...listaTemp, e.target.value]);
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

  return (
    <div className={styles.container}>
      <div className={styles.divFilterContainer}>
        <div className={styles.filterTemp}>
          <label>Filter Temperament</label>
          <select
            onChange={(e) => handleFilterTemp(e)}
            defaultValue={"All"}
            className={styles.tempSelected}
          >
            <option value="All" key="All">
              All Temperaments
            </option>
            {temperamentState?.map((temp) => (
              <option value={temp.name} key={temp.id} id={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.orders}>
          Order By
          <button name="AZ" value="AZ" onClick={handleSortName}>
            AZ
          </button>
          <button name="ZA" value="ZA" onClick={handleSortName}>
            ZA
          </button>
          <button name="WL" value="WL" onClick={handleSortWeight}>
            WL
          </button>
          <button name="WH" value="WH" onClick={handleSortWeight}>
            WH
          </button>
        </div>
      </div>
      <div className={styles.temps}>
        {listaTemp
          ? listaTemp.map((temp) => (
              <>
                {temp !== "All" ? (
                  <>
                    <button
                      key={temp}
                      className={styles.noselect, styles.temp}
                      key={temp}
                      id={temp}
                      value={temp}
                      onClick={() =>
                      handleOnClose(document.getElementById(`${temp}`).value)
                      }
                    >
                      <span className={styles.text}>{temp}</span>
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
                  </>
                ) : (
                  false
                )}
              </>
            ))
          : false}
      </div>
    </div>
  );
}
