import './App.css';
import React from 'react'
import { Route, Switch } from "react-router-dom";
import NavBar from './components/navbar/Navbar';
import LandingPage from './views/landing-page/LandingPage';
import Home from './views/home/Home'
import CreateBreed from './views/create-breed/CreateBreed'
import BreedDetail from './views/breed-detail/BreedDetail';

function App() {

  return (
    <div className="App">
    <Route exact path="/" component={LandingPage}/>
    <Route path="/:h" component={NavBar}/>
    <Route exact path="/home" component={Home}/>

    <Switch>
    <Route exact path="/home/create" component={CreateBreed}/>
    <Route exact path="/home/breed/:id" component={BreedDetail}/>
    </Switch>


    </div>
  );
}

export default App;
