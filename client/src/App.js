import './App.css';
import { Route } from "react-router-dom";
import NavBar from './components/navbar/Navbar';
import LandingPage from './views/landing-page/LandingPage';
import Home from './views/home/Home'
import CreateBreed from './views/create-breed/CreateBreed'
import BreedDetail from './views/breed-detail/BreedDetail';

function App() {

  return (
    <div className="App">
    <Route path="/:h" component={NavBar}/>
      
      <h1>Henry Dogs</h1>
    <Route exact path="/" component={LandingPage}/>
    <Route exact path="/home/create" component={CreateBreed}/>
    <Route exact path="/home" component={Home}/>
    <Route path="/home/breed/:id" component={BreedDetail}/>

    </div>
  );
}

export default App;
