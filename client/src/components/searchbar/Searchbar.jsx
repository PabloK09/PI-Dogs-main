import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBreedsName, getBreeds, searchBreedName } from "../../redux/actions";
import { useLocation, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./SearchBar.module.css"
import {SiDatadog } from 'react-icons/si'
import {MdFavorite, MdPets, MdQuestionAnswer, MdHome, MdSearch} from 'react-icons/md'


export default function SearchBarr() {
  const location = useLocation();
  const dispatch = useDispatch();
  const {id} = useParams()

  const [search, setSearch] = useState({
    breedFind: "",
  });

  useEffect(() => {
    
    return () => dispatch(getBreeds());
  }, [dispatch]);
  
  function handleChange(e) {
    setSearch((prevData) => {
      const state = {
        ...prevData,
        [e.target.name]: e.target.value,
      };
      if (state.breedFind) {
        state.breedFind = state.breedFind[0].toUpperCase() + state.breedFind.substring(1);
      }
      return state;
  })}

  function handleSubmit(e) {
    e.preventDefault();
      dispatch(searchBreedName(search.breedFind))
      setSearch(() => ({
        breedFind: "",
      }));
    
  }

  return (
    <nav className={styles.nav}>
       <h3 className={styles.h1}><SiDatadog className={styles.logo}/> BFF Gallery</h3>
       
       {
         location.pathname === "/home/" || location.pathname === "/home"? 
       
      <form onSubmit={(e) => handleSubmit(e)} className={styles.formInput}>
        <div className={styles.inputDiv}>

        <input
          type="text"
          name="breedFind"
          onChange={(e) => handleChange(e)}
          value={search.breedFind}
          className={styles.inputSearch}
          placeholder="Search your best friend..."
          autoComplete="off"
          />
        <div className={styles.divSearch}>
        <button type="submit" className={styles.btnSearch}><MdSearch className={styles.iconSearch}/></button>
        </div>
        </div>
      </form>

      : location.pathname === "/home/create" || location.pathname === "/home/create/" ?
      <div>
        <h2>Create your fantasy best friend</h2>
      </div>

      : location.pathname === "/home/favourites" || location.pathname === "/home/favourites/" ?
      <div>
        <h2>Your favorites best friends</h2>
      </div>
      : location.pathname == `/home/breed/${id}` ? 
      <div>
        <h2>The Breed Detailed</h2>
      </div>
      :
      <div>
        <h2>About Me</h2>
      </div>
      }
      
      <div className={styles.divBotones}>
      <NavLink to="/home">
      <button className={styles.btnCreate}>
          <MdHome className={styles.iconSearchB}/> Home 
          </button>
      </NavLink>
      <NavLink to="/home/create">
        <button className={styles.btnCreate}>
          <MdPets className={styles.iconSearchB}/> Create 
          </button>
      </NavLink>
      <NavLink to="/home/favourites">
      <button className={styles.btnCreate}>
      <MdFavorite className={styles.iconSearchB}/>  My BFF's 
      </button>
      </NavLink>

      <NavLink to="/home/about">
      <button className={styles.btnCreate}>
         <MdQuestionAnswer className={styles.iconSearchB}/> About
      </button>
      </NavLink>
      </div>
    </nav>
  );
}
