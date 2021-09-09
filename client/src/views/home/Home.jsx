//import Breeds from "../../components/breeds/Breeds"
import SearchBarr from "../../components/searchbar/SearchBar";
import FilterSort from "../../components/filter-sort/Filtersort";

import Breed from "../../components/breed/Breed";
import styles from "../../components/breeds/Home.module.css";
import React, { useState, useEffect } from "react";
import { getBreeds } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import imageDog from "../../assets/wallpapers/404-oops.jpg";
import gifDog from "../../assets/wallpapers/ezgif.com-video-to-gif__2_.gif";
import {MdNavigateNext, MdNavigateBefore} from 'react-icons/md'


export default function Home() {
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const [pageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const filteredBreeds = useSelector((state) => state.breedsFilter);
  const loading = useSelector((state) => state.isLoading);
  const breedsState = useSelector((state) => state.breeds);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreeds());
    return () => dispatch(getBreeds());
  }, []);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };



  const pages = [];
  if (filteredBreeds?.length) {
    for (
      let i = 1;
      i <= Math.ceil(filteredBreeds?.length / itemsPerPage);
      i++
    ) {
      pages.push(i);
    }
  } else {
    for (let i = 1; i <= Math.ceil(breedsState?.length / itemsPerPage); i++) {
      pages.push(i);
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBreeds?.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? styles.activePag : styles.comunLi}
          >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <div className={styles.divFather}>
      <SearchBarr />
      <div className={styles.containerMasPicante}>
        <div className={styles.containerMenosPicante}>
          <FilterSort
            setOrden={setOrden}
            setCurrentPage={(n) => setCurrentPage(n)}
          />
          {loading === true ? (
            <>
              <div
              style={{
                backgroundImage: `url(${gifDog})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={styles.containerClass}
            ></div>
            </>
          ) : currentItems.length === 0 ? (
            <div
              style={{
                backgroundImage: `url(${imageDog})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={styles.containerClass}
            ></div>
          ) : currentItems.length ? (
            <>
              <div className={styles.containerClass}>
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
            <div className={styles.divPagination}>
              <ul className={styles.pageNumbers}>
                <li className={styles.comunLi}>
                  <button
                    className={styles.navBtn}
                    onClick={handlePrevBtn}
                    disabled={currentPage === pages[0] ? true : false}
                  >
                    <MdNavigateBefore className={styles.navIcon}/>
                  </button>
                </li>
                {renderPageNumbers}
                <li className={styles.comunLi} > 
                  <button
                  className={styles.navBtn}
                    onClick={handleNextBtn}
                    disabled={
                      currentPage === pages[pages.length - 1] ? true : false
                    }
                    >
                    <MdNavigateNext className={styles.navIcon}/>
                  </button>
                </li>
              </ul>
                    </div>
            </>
          ) : !filteredBreeds.length ? (
            <div
              style={{
                backgroundImage: `url(${imageDog})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={styles.containerClass}
            ></div>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
}
