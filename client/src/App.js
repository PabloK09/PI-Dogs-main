import './App.css';
import React from 'react'
import { Route, Switch } from "react-router-dom";
// import NavBar from './components/navbar/Navbar';
import LandingPage from './views/landing-page/LandingPage';
import Home from './views/home/Home'
import CreateBreed from './views/create-breed/CreateBreed'
import BreedDetail from './views/breed-detail/BreedDetail';
import Favourites from './views/favourites/Favourites.jsx'
import About from './views/about/About.jsx'


function App() {
  return (
    <div className="App">
    <Route exact path="/" component={LandingPage}/>
    <Switch>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/home/create" component={CreateBreed}/>
    <Route exact path="/home/breed/:id" component={BreedDetail}/>
    <Route exact path="/home/about" component={About}/>
    <Route exact path="/home/favourites" component={Favourites}/>
    </Switch>


    </div>
  );
}

export default App;
