import React from 'react'
import { Link } from 'react-router-dom'
export default function Breed(props) {
    
    const {name, weight, temperament, img, height, life_span ,id} = props
    
    return (
        <div> {/*  key={id}?? REVISARR*/}
        <h3>{name}</h3>
        <ul>
            {height}
            <li>{weight}</li>
            {life_span}
            <li>{temperament}</li>
        </ul>
        <Link to={`/home/breed/${id}`}>
        <img style={{widht: "400px", height: "300px"}} src={img} alt="{name}"/>      
        </Link>
            
        </div>
    )
}