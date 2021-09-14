import React from "react";
import SearchBarr from "../../components/searchbar/SearchBar";
import styles from "../home/Home.module.css";
import dogAbout from "../../assets/about/dogAbout.jpg";
import iconExpress from "../../assets/iconos/pngwing.com (5).png";
import {BiWorld} from "react-icons/bi"
import { DiHtml5, DiCss3, DiJavascript, DiReact } from "react-icons/di";
import {
  SiRedux,
  SiNodeDotJs,
  SiJavascript,
  SiPostgresql,
  SiLinkedin,
  SiGmail,
  SiGithub
} from "react-icons/si";
import { FaTools } from "react-icons/fa";

export default function About() {
  return (
    <div className={styles.divFather}>
      <SearchBarr key="SearchBar" />
      <div className={styles.containerChildH}>
        <div className={styles.containerChildL}>
          <div className={styles.containerClassAbout}>
            <div className={styles.infoAbout}>
              <div className={styles.container}>
                <div className={styles.divAbout}>
                    <div>
                  <h2 className={styles.h2About}>Hello World!</h2>
                    </div>
                  <h3 className={styles.h3About}>Me llamo Pablo Koll soy Full-Stack Web Developer</h3>
                  <p className={styles.pAbout}>
                    Este es el primer proyecto que realizo usando las
                    herramientas y tecnologias que aprendi en el bootcamp de
                    Henry, el objetivo del proyecto fue realizar una galeria de
                    razas de perros implementando todo lo aprendido. La API que
                    utilice para el desarrollo fue https://docs.thedogapi.com/
                    usando unicamente el endpoint de /breeds.
                  </p>
                  <p className={styles.pAbout}>
                    En la realizacion del Front-End utilice la libreria de React
                    JS combinandola con Redux y la interfaz visual la hice con
                    CSS puro. En el Back-End use Node JS y Express para realizar
                    las rutas, mientras que la base de datos la cree con
                    PostgreSQL y Sequelize.
                  </p>
                  <p className={styles.pAbout}>
                    Para contactarme les dejo mis redes abajo, muchas gracias
                    por darte una vuelta!
                  </p>
                  <div className={styles.socialButtons} >
                      <div className={styles.effect}>
                      <a className={styles.aLink} target="_blank" href="https://www.linkedin.com/in/pablo-koll/" aria-hidden="true"><SiLinkedin className={styles.iconA}/></a>
                      </div>
                      <div className={styles.effect}>
                      <button className={styles.aLink} onClick={()=> alert("My mail is: pablokollm@gmail.com")}><SiGmail className={styles.iconA}/></button>
                      </div>
                      <div className={styles.effect}>
                      <a className={styles.aLink} target="_blank" href="https://github.com/PabloK09" aria-hidden="true"><SiGithub className={styles.iconA}/></a>
                      </div>
                  </div>
                </div>
                <div className={styles.listTools}>
                  <h3>
                    <FaTools /> Tools I know 
                  </h3>
                  <div className={styles.liContainer}>
                    <li className={styles.liAbout}>
                      <DiHtml5 className={styles.liIcon} />
                    </li>

                    <li className={styles.liAbout}>
                      <DiCss3 className={styles.liIcon} />
                    </li>

                    <li className={styles.liAbout}>
                      <DiJavascript className={styles.liIcon} />
                    </li>

                    <li className={styles.liAbout}>
                      <DiReact className={styles.liIcon} />
                    </li>
                    <li className={styles.liAbout}>
                      <SiRedux className={styles.liIcon} />
                    </li>
                    <li className={styles.liAbout}>
                      <SiNodeDotJs className={styles.liIcon} />
                    </li>
                    <li className={styles.liAbout}>
                      <SiPostgresql className={styles.liIcon} />
                    </li>
                    <div className={styles.logoExpress}>
                      <li className={styles.liAbout}>
                        <img
                          src={iconExpress}
                          alt="Express Logo"
                          className={styles.iconExpress}
                        />
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.containerImg}>
                <img
                  src={dogAbout}
                  className={styles.bkgAbout}
                  alt="About Dog"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
