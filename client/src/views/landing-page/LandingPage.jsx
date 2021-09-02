import {Link} from 'react-router-dom';
import React from "react";
import animal from "../../assets/iconos/animal-paw-print.png"
import "./LandingPage.css";


export default function LandingPage() {
    return (
        <div className='container-lp'>
        <header>
        
        </header>

        <input type="image" src={animal} alt="doggg" />
            <Link to="/home">

                <img src={animal} alt="dog-icon"/>
            </Link>
        </div>
    );
};


