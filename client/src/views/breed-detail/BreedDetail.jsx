/* eslint-disable */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getBreedId, clearBreed } from "../../redux/actions";
import SearchBarr from "../../components/searchbar/Searchbar";
import styles from "./BreedDetail.module.css";
import gifDog from "../../assets/wallpapers/ezgif.com-video-to-gif__2_.gif";
import {MdPets} from 'react-icons/md'
import {GiWeight, GiBodyHeight, GiLifeBar, GiSittingDog} from 'react-icons/gi'
import {BiWorld} from 'react-icons/bi'
import {FaDog, FaDrumstickBite} from 'react-icons/fa'

export default function BreedDetail() {
  const breedId = useSelector((state) => state.breedId);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBreedId(id));
    return () => dispatch(clearBreed());
  }, [id, dispatch]);

  return (
    <div>
      <SearchBarr />
      {breedId ? (
        <div className={styles.divFather}>
          <div className={styles.divContainerBreed}>
            {breedId.map((breed) => {
              return (
                <div key={breed.id} className={styles.BreedDetail}>
                  <div className={styles.divBreedDates}>
                  <h2 className={styles.h2AboutBreed}><MdPets/> About {breed.name}</h2>
                  <div className={styles.liContainer}>
                  <ul className={styles.ulBreedDetail}>
                  {breed.bred_for && breed.breed_group ? 
                  <>
                  <h4>Breed Information</h4>
                  <li className={styles.liItemDetail}><strong><FaDog/> Breed Group:</strong> {breed.breed_group}</li>
                  <li className={styles.liItemDetail}><strong><FaDrumstickBite/> Breed For:</strong> {breed.bred_for}</li>
                  {
                    breed.origin ? 
                    <li className={styles.liItemDetail}><strong><BiWorld/>  Origin:</strong> {breed.origin}</li>
                    : false
                  }
                  </>
                : false
                }
                  <h4>Breed Characteristics</h4>
                  {
                    breed.weight ?
                    <li className={styles.liItemDetail}><strong><GiWeight/> Weight:</strong> {breed.weight} kg</li>
                    : false
                  }
                  {
                    breed.height ?
                    <li className={styles.liItemDetail}><strong><GiBodyHeight/> Height:</strong> {breed.height} cm</li>
                    : false
                  }
                  {
                    breed.life_span ?
                    <li className={styles.liItemDetail}><strong><GiLifeBar/> Life Span:</strong> {breed.life_span} years</li>
                    : false
                  }{
                    breed.temperament ?
                    <li className={styles.liItemDetail}><strong><GiSittingDog/> Temperaments:</strong> {breed.temperament}.</li>
                    : false
                  }
                  </ul>
                  </div>
                  </div>
                  <div className={styles.imgContainer}>
                    <img src={breed.image} alt={breed.name} className={styles.imgBreedDetail}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : breedId === undefined ? (
        <div className={styles.divFather}>
        <div
          className={styles.divContainerBreed}
          style={{
            backgroundImage: `url(${gifDog})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        </div>
      ) : (
        <h2>
          Breed Not Found
          {push(`/home`)}
        </h2>
      )}
    </div>
  );
}
