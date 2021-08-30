import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBreeds } from "../../redux/actions/index";

export default function Breeds() {
  const breeds = useSelector((state) => state.breeds);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBreeds());
  }, []);

  return (
    <div>
      {breeds.map((breed) => {
        return <p>{breed.name}</p>;
      })}
    </div>
  );
}
