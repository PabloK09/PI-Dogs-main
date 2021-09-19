import { Link } from "react-router-dom";
import {SiDatadog } from 'react-icons/si'
import React from "react";
import styles from "./LandingPage.module.css";

export default function LandingPage() {

  return (
      <div className={styles.landingPage}>
        <div className={styles.containerLP}>
      <h1 className={styles.h1}><SiDatadog/>BFF Gallery</h1>
      <h3 className={styles.h3}>Find your best friend</h3>
      <p className={styles.p}>Come and discover all the possible breeds of the most beautiful animal in the world. You will also be able to create your own fantasy breed!</p>
      <Link to="/home">
        <button className={styles.btnLP}>View More</button>
      </Link>
    </div>
    </div>
  );
}
