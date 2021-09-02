import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { POST_URL } from "../../utils/constants";
import { getBreeds, getTemperament } from "../../redux/actions/index";

export default function CreateBreed() {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [breeds, setBreeds] = useState({
    name: "",
    weightMin: [],
    weightMax: [],
    heightMin: [],
    heightMax: [],
    life_spanMin: [],
    life_spanMax: [],
    image: "",
    temperament: [],
    temperamentPrev: [],
  });

  const temperamentState = useSelector((state) => state.temperament);
  useEffect(() => {
    dispatch(getTemperament());
  }, []);

  function handleChange(e) {
    setBreeds((prevData) => {
      const state = {
        ...prevData,
        [e.target.name]: e.target.value,
      };
      return state;
    });
  }

  function handleChangeArray(e) {
    setBreeds((prevData) => {
      let state = {
        ...prevData,
        [e.target.name]: [parseInt(e.target.value)],
      };
      if (
        state.weightMin.length &&
        state.weightMax.length &&
        state.heightMin.length &&
        state.heightMax.length
      ) {
        state.weight = state.weightMin.concat(state.weightMax);
        state.height = state.heightMin.concat(state.heightMax);
        state.life_span = state.life_spanMin.concat(state.life_spanMax);
      }
      //console.log("SOY STATE", state);
      return state;
    });
  }

  function handleChangeTemp(e) {
    setBreeds((prevData) => {
      let state = {
        ...prevData,
        [e.target.name]: e.target.value,
      };
      if (state.temperamentPrev.length) {
        if (!state.temperament.includes(state.temperamentPrev)) {
          state.temperament?.push(state.temperamentPrev);
        }
      }
      return state;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //console.log("SOY BREEDS", breeds);
    await axios
      .post(POST_URL, breeds)
      .then((response) => {
        alert("The breed was added successfully🐶");
        dispatch(getBreeds());
        console.log(response);
            push(`/home/breed/${response.data[0].breedId}`)
      })
      .catch((err) => {
        console.log(err);
        alert("The breed cants created");
      });
  }

  return (
    <div>
      <h2>Create a Breed</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>

        <input
          type="text"
          name="name"
          value={breeds.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <label htmlFor="weightMin">WeightMin</label>
        <input
          type="number"
          name="weightMin"
          value={breeds.weightMin}
          onChange={handleChangeArray}
        />

        <label htmlFor="heightMin">heightMin</label>
        <input
          type="number"
          name="heightMin"
          value={breeds.heightMin}
          onChange={handleChangeArray}
        />

        <label htmlFor="life_spanMin">life_spanMin</label>
        <input
          type="number"
          name="life_spanMin"
          value={breeds.life_spanMin}
          onChange={handleChangeArray}
        />
        <br />
        <br />
        <br />
        <br />
        <label htmlFor="weightMax">weightMax</label>
        <input
          type="number"
          name="weightMax"
          value={breeds.weightMax}
          onChange={handleChangeArray}
        />

        <label htmlFor="heightMax">heightMax</label>
        <input
          type="number"
          name="heightMax"
          value={breeds.heightMax}
          onChange={handleChangeArray}
        />

        <label htmlFor="life_spanMax">life_spanMaxn</label>
        <input
          type="number"
          name="life_spanMax"
          value={breeds.life_spanMax}
          onChange={handleChangeArray}
        />

        <br/>
        <br/>
        <br/>
        <label htmlFor="image">image</label>
        <input
          type="url"
          name="image"
          value={breeds.image}
          onChange={handleChange}
        />

        <br/>
        <br/>
        <label htmlFor="temperament-select">Choose Temperament: </label>

        <select
          name="temperamentPrev"
          value={[breeds.temperamentPrev]}
          onChange={(e)=>handleChangeTemp(e)}
          multiple
          size="20"
        >
          {temperamentState?.map((temp) => (
            <option value={temp.id} key={temp.id}>
              {temp.name}
            </option>
          ))
          
          }
        </select>

        <input type="submit" />
      </form>
    </div>
  );
}
