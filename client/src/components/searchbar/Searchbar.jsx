import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBreedsName } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { clearBreed } from "../../redux/actions/index";

export default function SearchBarr() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const breedState = useSelector((state) => state.breeds);

  const [state, setState] = useState({
    breedFind: "",
  });

  function handleChange(e) {
    setState((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));

    //dispatch(getBreedsName(state.breedFind))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      state.breedFind === "" ||
        breedState.map((breed) => {
          console.log(state.breedFind);
          breed.name
            .toLocaleLowerCase()
            .includes(state.breedFind.toLocaleLowerCase());
        })
    )
     {
      dispatch(getBreedsName(state.breedFind));
      setState(() => ({
        breedFind: "",
      }));
    } else {
      push("/home");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Breed:</label>
        <input
          type="text"
          name="breedFind"
          onChange={(e) => handleChange(e)}
          value={state.breedFind}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
