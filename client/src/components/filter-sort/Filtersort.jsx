import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "../../redux/store/index";
import {
  getTemperament,
  filterTemperaments,
  getBreeds,
  getBreedsName,
  orderByBreedName,
  orderByBreedWeight,
} from "../../redux/actions/index";

export default function FilterSort({ setCurrentPage, setOrden }) {
  const dispatch = useDispatch();
  const temperamentState = useSelector((state) => state.temperament);

  const breedsState = useSelector((state) => state.breeds);
  const filterBreeds = useSelector((state) => state.breedsFilter);

  useEffect(() => {
    dispatch(getTemperament());
    return () => dispatch(filterTemperaments([]));
  }, [dispatch]);

  const [listaTemp, setListaTemp] = useState({
    temperamentoSel: [],
    temperamentoTotal: [],
  });

  useEffect(() => {
    dispatch(filterTemperaments(listaTemp.temperamentoTotal));
  }, [dispatch]);

  function handleChange(e) {
    setListaTemp((prevData) => {
      const state = {
        ...prevData,
        [e.target.name]: e.target.value,
      };
      return state;
    });
  }

  function handleClear(e) {
    e.preventDefault();
    setListaTemp({
      temperamentoSel: [],
      temperamentoTotal: [],
    });
    dispatch(filterTemperaments([]));
    dispatch(getBreedsName(""));
  }

  let filtro = [];
  function handleClick(e) {
    e.preventDefault();
    if (filterBreeds?.length) {
      if (listaTemp.temperamentoSel?.length > 1) {
        filtro = filterBreeds.filter((temp) =>
          temp.temperament?.includes(listaTemp.temperamentoSel)
        );
        if (!listaTemp.temperamentoTotal?.includes(listaTemp.temperamentoSel)) {
          listaTemp.temperamentoTotal?.push(listaTemp.temperamentoSel);
        }
        dispatch(filterTemperaments(filtro));
      }
    } else if (listaTemp.temperamentoSel?.length > 1) {
      filtro = breedsState.filter((temp) =>
        temp.temperament?.includes(listaTemp.temperamentoSel)
      );
      if (!listaTemp.temperamentoTotal?.includes(listaTemp.temperamentoSel)) {
        listaTemp.temperamentoTotal?.push(listaTemp.temperamentoSel);
      }
      dispatch(filterTemperaments(filtro));
    }
  }

  let filtro2 = [];
  function handleOnClose(e) {
    setListaTemp((prevData) => {
      let state = {
        ...prevData,
      };
      state.temperamentoTotal = state.temperamentoTotal.filter(
        (temp) => temp !== e
      );
      return state;
    });

    if (filterBreeds?.length) {
      if (listaTemp.temperamentoSel?.length > 1) {
        filtro2 = filterBreeds.filter((temp) =>
          !temp.temperament?.includes(listaTemp.temperamentoSel)
        );
        if (!listaTemp.temperamentoTotal?.includes(listaTemp.temperamentoSel)) {
          listaTemp.temperamentoTotal?.push(listaTemp.temperamentoSel);
        }
        dispatch(filterTemperaments(filtro2));
      }
    } else if (listaTemp.temperamentoSel?.length > 1) {
      filtro2 = breedsState.filter((temp) =>
        !temp.temperament?.includes(listaTemp.temperamentoSel)
      );
      if (!listaTemp.temperamentoTotal?.includes(listaTemp.temperamentoSel)) {
        listaTemp.temperamentoTotal?.push(listaTemp.temperamentoSel);
      }
      dispatch(filterTemperaments(filtro2));
    }else {
      dispatch(filterTemperaments([]))
    }
  }

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

  return (
    <div>
      <button name="AZ" value="AZ" onClick={handleSortName}>
        {" "}
        AZ{" "}
      </button>
      <button name="ZA" value="ZA" onClick={handleSortName}>
        {" "}
        ZA{" "}
      </button>
      <button name="WL" value="WL" onClick={handleSortWeight}>
        {" "}
        WL{" "}
      </button>
      <button name="WH" value="WH" onClick={handleSortWeight}>
        {" "}
        WH{" "}
      </button>
      <label>Filter Temperament</label>
      <select
        name="temperamentoSel"
        value={listaTemp.temperamentoSel}
        autocomplete="off"
        onChange={handleChange}
        onClick={handleClick}
        value="Choose Temperament"
      >
        <option value="Choose Temperament">Choose Temperament</option>
        {temperamentState?.map((temp) => (
          <option value={[temp.name]} key={temp.id}>
            {temp.name}
          </option>
        ))}
      </select>
      <button onClick={(e) => handleClear(e)}>Clear</button>
      <div className="temperamentSelected">
        {listaTemp.temperamentoTotal
          ? listaTemp.temperamentoTotal?.map((temp) => (
              <ul>
                <li>
                  {temp}
                  <button
                    id={temp}
                    value={temp}
                    onClick={() =>
                      handleOnClose(document.getElementById(`${temp}`).value)
                    }
                  >
                    X
                  </button>
                </li>
              </ul>
            ))
          : false}
      </div>
    </div>
  );
}
