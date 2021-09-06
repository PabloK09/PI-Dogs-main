//import Breeds from "../../components/breeds/Breeds"
import SearchBarr from "../../components/searchbar/SearchBar"
import FilterSort from "../../components/filter-sort/Filtersort"

import Breed from "../../components/breed/Breed"
import "../../components/breeds/Breeds.css";
import React, { useState, useEffect } from "react";
import { getBreeds } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const [orden, setOrden] = useState("")
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

  if(breedsState?.message){
    throw new Error("Raza no encontrada")
  }

  const pages= [];
  if(filteredBreeds?.length) {
    for (let i = 1; i<= Math.ceil(filteredBreeds?.length / itemsPerPage); i++){
      pages.push(i)
    }
  }else {
      for (let i = 1; i<= Math.ceil(breedsState?.length / itemsPerPage); i++){
        pages.push(i)
      }
  }
    
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =  filteredBreeds?.length ? filteredBreeds?.slice(indexOfFirstItem, indexOfLastItem) : breedsState?.slice(indexOfFirstItem, indexOfLastItem);

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
         <SearchBarr/>
         <FilterSort setOrden={setOrden} setCurrentPage={(n)=>setCurrentPage(n)}/>
        
    {
      loading ?
      <>
      <img src="https://static.wixstatic.com/media/72fac8_14ede31619e44b0498c84845f0befbdb~mv2.gif" alt="Dog is Loading" style={{width: "350px", height: "350px"}}/>
      </>
      : (
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
        ) : (
          <h2> <img src="https://static.wixstatic.com/media/72fac8_14ede31619e44b0498c84845f0befbdb~mv2.gif" alt="Dog is Loading" style={{width: "350px", height: "350px"}}/></h2>
        )
      )
    }
    </div>
  );
}
