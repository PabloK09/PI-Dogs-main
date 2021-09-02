import React from 'react'
import { Link } from 'react-router-dom'
export default function Breed(props) {
    
    const {name, weight, temperament, img, height, life_span ,id} = props
    
    return (
        <div className="containerBreed">
        <h3 className="name-containerBreed">{name}</h3>
        <ul className="ul-containerBreed">
            <li>{height}</li>
            <li>{weight}</li>
            <li>{life_span}</li>
            <li>{temperament}</li>
        </ul>
        <Link to={`/home/breed/${id}`}>
        <img className="img-containerBreed" style={{width: "400px", height: "300px"}} src={img} alt="{name}"/>      
        </Link>
            
        </div>
    )
}