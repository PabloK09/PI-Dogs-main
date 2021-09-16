import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breed.module.css";


export default function Breed(props) {
  const {
    name,
    weight,
    temperament,
    img,
    height,
    life_span,
    id,
    addFav,
    fav
  } = props;

  return (
    <div className={styles.containerBreed}>
      <div className={styles.containerListado}>
        <div className={styles.containName}>
          <h3 className={styles.name_containerBreed}>{name}</h3>
          <label className={styles.like}>
            <input
              className={styles.inputHearth}
              id={name}
              type="checkbox"
              onClick={addFav}
              defaultChecked={fav}
            />

            <div className={styles.hearth} />
          </label>
        </div>
        <ul className={styles.ul}>
          {height ? (
            <li className={styles.li_height}>
              <strong>Height: </strong>
              {height} cm
            </li>
          ) : (
            false
          )}
          <li className={styles.li_weight}>
            <strong>Weight:</strong> {weight} kg
          </li>
          {life_span ? (
            <li className={styles.li_life_span}>
              <strong>Life Span:</strong> {life_span}
            </li>
          ) : (
            false
          )}
          <li className={styles.li_temp}>
            <strong>Temperaments:</strong> {temperament}
          </li>
        </ul>
        {height ? (
          false
        ) : (
          <div className={styles.divBtn}>
            <Link to={`/home/breed/${id}`}>
              <button className={styles.btn_bottom}>Learn More</button>
            </Link>
          </div>
        )}
      </div>
      <div className={styles.divImg}>
        <img className={styles.img_containerBreed} src={img} alt={name} />
      </div>
    </div>
  );
}
