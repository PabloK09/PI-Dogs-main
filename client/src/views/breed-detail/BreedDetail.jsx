import React from "react";
import Breed from "../../components/breed/Breed";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getBreedId, clearBreed, getBreeds } from "../../redux/actions";
import SearchBarr from "../../components/searchbar/SearchBar";
import styles from "./BreedDetail.module.css"

export default function BreedDetail() {
  const loading = useSelector((state) => state.isLoading)
  const breedId = useSelector((state) => state.breedId);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getBreeds())
    dispatch(getBreedId(id));
    return () => dispatch(clearBreed());
  }, [id, dispatch]);

  return (
    <div>
      <SearchBarr/>
      {
        loading ?
        <>
        <img src="https://static.wixstatic.com/media/72fac8_14ede31619e44b0498c84845f0befbdb~mv2.gif" alt="Dog is Loading" style={{width: "350px", height: "350px"}}/>
        </>
        :
      breedId ? (
        <>
        {breedId.map((breed) => {
          return (
            <div key={breed.id} className={styles.BreedDetail}>
                <Breed
                id={breed.id}
                key={breed.id}
                name={breed.name}
                weight={breed.weight}
                height={breed.height}
                life_span={breed.life_span}
                temperament={breed.temperament}
                img={breed.image}
                />
                </div>
                );
              })}
        </>
        ) : breedId === undefined ? (
          <div> Cargando... </div>
          ) : (
            <h2>
            Breed Not Found
            {push(`/home`)}
            </h2>
            )
          }
    </div>
  );
}
