import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBarr from "../../components/searchbar/Searchbar";
import Breeed from "../../components/breed/Breed";
import styles from "../home/Home.module.css";
import gifDog from "../../assets/wallpapers/ezgif.com-video-to-gif__2_.gif";
import imageDog from "../../assets/wallpapers/very+happy+dog-fav.jpg";
import {
  addBreedFavourites,
  removeBreedFavorite,
  getBreeds,
} from "../../redux/actions/index";

export default function Favourites() {
  const dispatch = useDispatch();

  let breedsFav = useSelector((state) => state.breeds);
  function addFav(id) {
    if (!breedsFav.includes(id)) {
      dispatch(addBreedFavourites(id));
    }
    if (breedsFav.includes(id)) {
      dispatch(removeBreedFavorite(id));
    }
  }

  breedsFav = breedsFav.filter((breed) => breed.fav === true);

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  return (
    <div className={styles.divFather}>
      <SearchBarr key="SearchBar" />
      <div className={styles.containerChildH}>
        <div className={styles.containerChildL}>
          {!breedsFav.length ? (
            <div
              style={{
                backgroundImage: `url(${imageDog})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={styles.containerClassAF}
            ></div>
          ) : breedsFav.length ? (
            <>
              <div className={styles.containerClassAF}>
                {breedsFav?.map((breed) => {
                  return (
                    <Breeed
                      id={breed.id}
                      key={breed.id}
                      name={breed.name}
                      addFav={() => addFav(breed)}
                      weight={breed.weight}
                      temperament={breed.temperament}
                      img={breed.image}
                      fav={breed.fav}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div
              style={{
                backgroundImage: `url(${gifDog})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={styles.containerClassAF}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
