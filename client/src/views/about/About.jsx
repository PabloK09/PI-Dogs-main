import React, { useState, useRef } from "react";
import SearchBarr from "../../components/searchbar/Searchbar";
import styles from "../home/Home.module.css";
import dogAbout from "../../assets/about/dogAbout.jpg";
import {
  SiLinkedin,
  SiGmail,
  SiGithub,
} from "react-icons/si";
import {MdContentCopy} from "react-icons/md"

export default function About() {
  const [showMail, setShowMail] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select()
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

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
                  <h3 className={styles.h3About}>
                    My name is Pablo Koll and I'm a Full-Stack Web Developer.
                  </h3>
                  <p className={styles.pAbout}>
                    This is the <strong>first project </strong>I have done using the tools and
                    technologies that I learned in <strong><a
                        className={styles.aLink}
                        style={{color: "black"}}
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.soyhenry.com/"
                        aria-hidden="true"
                      >Henry's bootcamp</a></strong>. The
                    objective of the project was to make a dog breeds gallery
                    breeds of dogs implementing everything I learned. The API
                    that I used for the development was
                    <strong> <a
                        className={styles.aLink}
                        style={{color: "black"}}
                        target="_blank"
                        rel="noreferrer"
                        href="https://docs.thedogapi.com"
                        aria-hidden="true"
                      >https://docs.thedogapi.com </a></strong>using only the endpoint of
                    /breeds.
                  </p>
                  <p className={styles.pAbout}>
                    In the realization of the <strong> Front-End</strong>  I used the library of 
                    React JS library combined with Redux and the visual
                    interface was made with pure CSS. In the <strong> Back-End </strong>  I used
                    Node JS and Express for the routes, while the database was
                    created with PostgreSQL and Sequelize.
                  </p>
                  <p className={styles.pAbout}>
                    To <strong> contact </strong> me I leave you my networks below, thank you very
                    much for stopping by!
                  </p>
                  <div className={styles.socialButtons}>
                    <div className={styles.effect}>
                      <a
                        className={styles.aLink}
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.linkedin.com/in/pablo-koll/"
                        aria-hidden="true"
                      >
                        <SiLinkedin className={styles.iconA} />
                      </a>
                    </div>
                    <div className={styles.effect}>
                      <button
                        className={styles.aLink}
                        onClick={() => setShowMail(true)}
                      >
                        <SiGmail className={styles.iconA} />
                      </button>
                    </div>
                    <div className={styles.effect}>
                      <a
                        className={styles.aLink}
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/PabloK09"
                        aria-hidden="true"
                      >
                        <SiGithub className={styles.iconA} />
                      </a>
                    </div>
                  </div>
                  {showMail ? (
                    <div className={styles.aboutMail}> <textarea
                    className={styles.aboutText}
                    ref={textAreaRef}
                    defaultValue='pablokollm@gmail.com'
                    readOnly={true}  
                  /><div className={styles.divCopy}>
                  <button onClick={copyToClipboard} className={styles.aLink}><MdContentCopy className={styles.iconCopy} /></button>  <span className={styles.copied}>{copySuccess}</span> </div>
                    </div> 
                  ) : (
                    <div></div>
                  )}
                </div>
                {/* <div className={styles.listTools}>
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
                    </div> */}
                  {/* </div> */}
                {/* </div> */}
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
