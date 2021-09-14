import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store/index"
import configureStore from "redux-mock-store";

import { App } from "../App.js";
import LandingPage from "../views/landing-page/LandingPage";
import Home from "../views/home/Home";
import CreateBreed from "../views/create-breed/CreateBreed";
import BreedDetail from "../views/breed-detail/BreedDetail";
import Favourites from '../views/favourites/Favourites.jsx'
import About from '../views/about/About.jsx'

configure({ adapter: new Adapter() });

describe("App", () => {
  it('El componente LandingPage debe renderizarse en la ruta / (Sólo en la ruta "/")', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(LandingPage)).toHaveLength(1);
  });
  
  it('No tienen que renderizarse componentes en otra rutas', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(LandingPage)).toHaveLength(0);
    expect(wrapper.find(Home)).toHaveLength(0);
  })

  it('El componente Home debe renderizarse en la ruta /home (Sólo en la ruta "/home")', () => {
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[ '/home' ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
  })

  it('El componente CreateBreed debe renderizarse en la ruta /home/create (Sólo en la ruta "/home/create")', () => {
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[ '/home/create' ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(CreateBreed)).toHaveLength(1);
  })

  it('El componente BreedDetail debe renderizarse en la ruta /home/breed/:id (Sólo en la ruta "/home/breed/:id")', () => {
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[ '/home/breed/:id' ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(BreedDetail)).toHaveLength(1);
  })
  it('El componente About debe renderizarse en la ruta /home/about (Sólo en la ruta "/home/about")', () => {
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[ '/home/about' ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(About)).toHaveLength(1);
  })
  it('El componente Favourites debe renderizarse en la ruta /home/favourites (Sólo en la ruta "/home/favourites")', () => {
    const wrapper = mount(
      <Provider store={store}>
      <MemoryRouter initialEntries={[ '/home/favourites' ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Favourites)).toHaveLength(1);
  })
});
