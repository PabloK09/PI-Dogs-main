import Breed from "../breed/Breed";
import "./Breeds.css";
import React, { useState, useEffect } from "react";
import { getBreeds } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

export default function Breeds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const [pageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const filteredBreeds = useSelector((state) => state.breedsFilter)
  const loading = useSelector((state) => state.isLoading)
  const breedsState = useSelector((state) => state.breeds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreeds());
    return () => dispatch(getBreeds());
  }, []);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id))
  };

  const pages= [];
  if(filteredBreeds.length) {
    for (let i = 1; i<= Math.ceil(filteredBreeds.length / itemsPerPage); i++){
      pages.push(i)
    }
  }else {
    for (let i = 1; i<= Math.ceil(breedsState.length / itemsPerPage); i++){
      pages.push(i)
    }
  }
    
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =  filteredBreeds.length ? filteredBreeds?.slice(indexOfFirstItem, indexOfLastItem) : breedsState?.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {

      if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
        return (
        <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? "activePag" : null} //para mandarle css
        >
          {number}
        </li>
      );
    }else {
      return null;
    }
  });

  const handleNextBtn = () => {
    console.log(loading);
    setCurrentPage(currentPage + 1)
    if(currentPage + 1 > maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <div>
      {loading ?
      <>
      <img src="http://northerntechmap.com/assets/img/loading-dog.gif" alt="Dog is Loading"/>
      <h3> Loading...</h3>
      </>
      :  
      currentItems ? (
        <>
        <div className="containerClass">
        {currentItems?.map((breed, index) => {
          return (
              <Breed
              id={breed.id}
              key={breed.id}
              name={breed.name}
              weight={breed.weight}
              temperament={breed.temperament}
              img={breed.image}
              />
              );
            })}
            </div>
            
            <ul className="pageNumbers">
            <li className="prevBtn">
            <button
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0]? true : false}
            >
            Prev
            </button>
            </li>
            {renderPageNumbers}
            
            <li>
            <button
            className="nextBtn"
            onClick={handleNextBtn}
            disabled={currentPage === pages[pages.length -1] ? true : false}
            >
            Next
            </button>
            </li>
            </ul>
            </>
            ) : <h2>No encontrado</h2>
          }
    </div>
  );
}
