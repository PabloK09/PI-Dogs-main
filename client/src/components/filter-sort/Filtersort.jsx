import React, { useState, useEffect } from "react";
import { getBreeds } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

export default function FilterSort() {
    const breedsState = useSelector((state) => state.breeds);
    

    return (
        <div>
            <button onClick> AZ </button>
        </div>
    )
}