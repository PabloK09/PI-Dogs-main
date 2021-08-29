import './App.css';
import { Route } from "react-router-dom";
import Home from './components/home/home'
import NavBar from './components/navBar/navBar';
import Breeds from './components/breeds/breeds';
import BreedDetail from './components/breedDetail/breedDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getBreeds} from './redux/actions/index'

function App() {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getBreeds())
  }, [])

  return (
    <div className="App">
      <h1>Henry Dogs</h1>

    <Route exact path="/" component={Home}/>
    <Route path="/:dogs" component={NavBar}/>
    {/* Aca el route para el formulario en el path= "/dog" */}
    <Route exact path="/dogs" component={Breeds}/>
    <Route path="/dogs/:id" component={BreedDetail}/>

    </div>
  );
}

export default App;
