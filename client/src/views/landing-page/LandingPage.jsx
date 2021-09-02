import {Link} from 'react-router-dom';
import React from "react";
import animal from "../../assets/iconos/animal-paw-print.png"
import "./LandingPage.css";


export default function LandingPage() {
    return (
        <div className='container-lp'>
        <header>
        Touch to enter the page
        
        </header>
            <Link to="/home">
                <img src={animal} alt="dog-icon"/>
            </Link>
        </div>
    );
};


