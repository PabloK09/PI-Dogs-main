import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBarr from "../../components/searchbar/SearchBar";
import Breed from "../../components/breed/Breed";
import styles from "../../components/breeds/Home.module.css";
import gifDog from "../../assets/wallpapers/ezgif.com-video-to-gif__2_.gif";
import imageDog from "../../assets/wallpapers/404-oops.jpg";
import {
  addBreedFavourites,
  removeBreedFavorite,
} from "../../redux/actions/index";

export default function Favourites() {
  const dispatch = useDispatch();
  const breedsFav = useSelector((state) => state.breedsFavourites);
  function addFav(id) {
    if (!breedsFav.includes(id)) {
      dispatch(addBreedFavourites(id));
    } else {
      dispatch(removeBreedFavorite(id));
    }
  }

  return (
    <div className={styles.divFather}>
      <SearchBarr key="SearchBar" />
      <div className={styles.containerMasPicante}>
        <div className={styles.containerMenosPicante}>
          {!breedsFav.length ? (
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
          ) : breedsFav.length === 0 ? (
            <div
              style={{
                backgroundImage: `url(${imageDog})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={styles.containerClass}
            ></div>
          ) : breedsFav.length ? (
            <>
              <div className={styles.containerClass}>
                {breedsFav?.map((breed, index) => {
                  return (
                    <Breed
                      id={breed.id}
                      key={breed.id}
                      name={breed.name}
                      addFav={() => addFav(breed)}
                      weight={breed.weight}
                      temperament={breed.temperament}
                      img={breed.image}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
}
