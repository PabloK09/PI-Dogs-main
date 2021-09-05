import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBreedsName, getBreeds } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SearchBarr() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const breedState = useSelector((state) => state.breeds);
  const filteredBreeds = useSelector((state) => state.breedsFilter);

  const [search, setSearch] = useState({
    breedFind: "",
  });

  useEffect(() => {
    return () => dispatch(getBreeds());
  }, []);
  
  function handleChange(e) {
    setSearch((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getBreedsName(search.breedFind))
    setSearch(() => ({
            breedFind: "",
          }));
  }

  return (
    <nav>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Breed:</label>
        <input
          type="text"
          name="breedFind"
          onChange={(e) => handleChange(e)}
          value={search.breedFind}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/home/create">
        <button>Create</button>
      </Link>
    </nav>
  );
}


 // if (filteredBreeds.length) {
    //   if (search.breedFind !== "") {
    //     let nameBreedFilter = filteredBreeds?.map((breed) => {
    //       if(breed.name.toLocaleLowerCase().includes(search.breedFind.toLocaleLowerCase())) return breed.name
    //     });
    //     dispatch(getBreedsName(search.breedFind));
    //     setSearch(() => ({
    //       breedFind: "",
    //     }));
    //   } else {
    //     dispatch(getBreedsName(""));
    //   }
    // } else {
    //   if (
    //     search.breedFind !== "" ||
    //     breedState?.map((breed) => {
    //       breed.name
    //         .toLocaleLowerCase()
    //         .includes(search.breedFind.toLocaleLowerCase());
    //     })
    //   ) {
    //     dispatch(getBreedsName(search.breedFind));
    //     setSearch(() => ({
    //       breedFind: "",
    //     }));
    //   } else {
    //     dispatch(getBreedsName(""));
    //   }
    // }