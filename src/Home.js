import React, { Component } from "react";

import { Link } from "react-router-dom";
import Snake from './images/snake.png'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div>
          <h1>:בחר רמת משחק</h1>
          <Link to="/easyGame" className="btn">
            קל
          </Link><br/>
          <Link to="/mediumGame" className="btn">
            בינוני
          </Link><br/>
          <Link to="/HardGame" className="btn">
            קשה
          </Link>
          <div>
            <img src={Snake} alt="snake" className='img'/>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
