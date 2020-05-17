import React, { Component } from "react";
import Game from "./Game";
import Home from './Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      
        <Router>
          <Switch>

            <Route exact path="/" component={Home}  />
            <Route exact path="/easyGame" render={()=><Game speed={200}/>}  />
            <Route exact path="/mediumGame" render={()=><Game speed={80}/>}  />
            <Route exact path="/HardGame" render={()=><Game speed={30}/>}  />
            
          </Switch>
        </Router>
    );
  }
}
export default App;
