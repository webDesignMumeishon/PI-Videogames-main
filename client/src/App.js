import './App.css';
import {Route, Switch} from 'react-router-dom'

//Modules imports
import { Landing } from './components/Landing/Landing';
import  Homepage from './components/Homepage/Homepage'
import VideoGameDetails from './components/VideoGameDetails/VideoGameDetails.js'
import {Navbar} from './components/Navbar/Navbar.js'
import {Addvideogame} from './components/Addvideogame/Addvideogame.js'


function App() {
  return (
    <div className="App">
          <Navbar/>
      <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/home' component={Homepage}/>
          <Route path='/home/:id' component={VideoGameDetails}/>
          <Route path='/addvideogame' component={Addvideogame}/>
      </Switch>
     
    </div>
  );
}

export default App;













      //  {/* <Route exact 
      //     path='/home/:id'
      //     component={props => <VideoGameDetails {...props} />} /> */}