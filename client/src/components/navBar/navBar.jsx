import {NavLink} from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/home" exact>
        Home
      </NavLink>
      <NavLink to="/home/create" exact>
        Add Breed
      </NavLink>
    </nav>
  );
}
