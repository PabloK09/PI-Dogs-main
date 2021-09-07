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
          <select onChange={(e) => handleFilterTemp(e)} defaultValue={"All"}  className={styles.tempSelected}>
            <option value="All" key="All">
              All Temperaments
            </option>
            {temperamentState?.map((temp) => (
              <option value={temp.name} key={temp.id} id={temp.name}>
                {temp.name}             
              </option>
            ))}
          </select>
          <div className={styles.select_icon}>
        <svg focusable="false" viewBox="0 0 104 128" width="25" height="35" class="icon">
          <path d="m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z"></path>
        </svg>
      </div>
        </div>

        <div className={styles.orders}>
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
      <div >
        {listaTemp
          ? listaTemp.map((temp) => (
              <>
                {temp !== "All" ? (
                  <>
                    <li key={temp}>
                      {temp}
                      <button
                        key={temp}
                        id={temp}
                        value={temp}
                        onClick={() =>
                          handleOnClose(
                            document.getElementById(`${temp}`).value
                          )
                        }
                      >
                        X
                      </button>
                    </li>
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
