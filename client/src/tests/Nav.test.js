import React from "react";
import { NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

import SearchBar from "../components/searchbar/SearchBar"

configure({ adapter: new Adapter() });

describe("<SearchBar />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SearchBar />);
  });

  it("Deberia renderizar Cuatro <NavLink />", () => {
    expect(wrapper.find(NavLink)).toHaveLength(4);
  });
  it('El primer Link debe tener el texto "Home" y cambiar la ruta hacia "/home".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(NavLink).at(0).prop("to")).toEqual("/Home");
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(0).text()).toEqual("Home");
  });
  it('El segundo Link debe tener el texto "Create" y cambiar la ruta hacia "/home/create"', () => {
    expect(wrapper.find(NavLink).at(1).prop("to")).toEqual("/home/create");
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(1).text()).toEqual("Create");
  });
});