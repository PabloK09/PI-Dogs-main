import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { App } from "../App.js";
import LandingPage from "../views/landing-page/LandingPage"
import Home from "../views/home/Home"
import SearchBar from "../components/searchbar/SearchBar"

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  beforeEach(() => {
    store = mockStore([]);
  })

  it('El componente LandingPage debe renderizar en la ruta / (Sólo en la ruta "/")', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(LandingPage)).toHaveLength(1);
    expect(wrapper.find(Home)).toHaveLength(0);
  });

  it('El componente Home debe renderizar en la ruta / (Sólo en la ruta "/")', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(LandingPage)).toHaveLength(0);
  });
});
