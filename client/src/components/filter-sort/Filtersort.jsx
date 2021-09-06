import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTemperament,
  filterTemperaments,
  orderByBreedName,
  orderByBreedWeight,
} from "../../redux/actions/index";

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
    <div>
      <label>Filter Temperament</label>

      <select onChange={(e) => handleFilterTemp(e)} defaultValue={"All"}>
        <option value="All">
          All Temperament
        </option>
        {temperamentState?.map((temp) => (
          <option value={temp.name} key={temp.id} id={temp.name}>
            {temp.name}
          </option>
        ))}
      </select>

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

      <div className="temperamentSelected">
        {listaTemp
          ? listaTemp.map((temp) => (
              <>
                {temp !== "All" ? (
                  <>
                    <li>
                      {temp}
                      <button
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
