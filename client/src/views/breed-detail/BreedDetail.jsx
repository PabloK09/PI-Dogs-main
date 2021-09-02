import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBreedId, clearBreed } from "../../redux/actions";
import Breed from "../../components/breed/Breed"

export default function BreedDetail() {
    
  const breedId = useSelector((state) => state.breedId);
  const dispatch = useDispatch()
  const {id} = useParams()
  useEffect(() => {
      dispatch(getBreedId(id))
      return ()=> dispatch(clearBreed()) //aca le hago un dismount
  }, [id, dispatch]); 

  return (
  <div>
  {
      breedId?
      <>
      {
      breedId.map((breed) => {
          return (
              <div key={breed.id}>
              <Breed
                id={breed.id}
                key={breed.id}
                name={breed.name}
                weight={breed.weight}
                height={breed.height}
                life_span={breed.life_span}
                temperament={breed.temperament}
                img={breed.image }
              />

              </div>
          )
      })
      }
      </>
      : breedId === undefined ? (
      <div> Cargando... </div>
      )
      : <h2> Breed Not Found </h2>
  }
  </div>
  
  );
}
