import React, { Component } from "react";
import "./App.css";
import {Link} from 'react-router-dom'
import SnakeImage from './images/snake.png'

import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 50,
  direction: "RIGHT",
  points: '',
  end:false,
  
  snakeDots: [
    [0, 0],
    [2, 0]
  ]
};

let startGame;
class Game extends Component {
  
  state = initialState;



  componentDidMount() {
    startGame = setInterval(this.moveSnake, this.props.speed);
    this.setState(initialState);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
  
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();

  }

  start =()=>{
    clearInterval(startGame);
    this.componentDidMount()
  }

  onKeyDown = e => {
    e = e || window.event;
    console.log(e.keyCode);

    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 13:
        this.componentDidMount();
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head);

    dots.shift();

    this.setState({
      snakeDots: dots
    });
  };
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];

    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
      
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];

    let head = snake[snake.length - 1];

    snake.pop();

    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
       
        this.onGameOver();

      }
    });
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];

    let food = this.state.food;

    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      });

      this.enlargeSnake();


    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];

    newSnake.unshift([]);

    this.setState({
      snakeDots: newSnake
    });
  }



  

  onGameOver() {
   
    this.setState({...initialState,points:this.state.snakeDots.length-2,end:true});
    clearInterval(startGame);
    
  }

  render() {
    return (
      <div style={{height:'100vh'}}>
      <div className="game-area">
        <div className='row'>
          
        <Snake className='col-8' snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
        <div className="points">
          <b>{this.state.snakeDots.length - 2}</b>
          <div style={{marginLeft: '-80px'}}>

        {this.state.end?<div className="end-game">  אופס! המשחק נגמר
          <br/>
          ניקוד: {this.state.points}
        </div>:null}</div>
        </div>
        </div>
      </div>
      <div className="buttons">
        <div className='col-6'>
          <button className="new-game btn" onClick={this.start} >משחק חדש</button>
          <br/>
          <Link to='/' className="back btn" >חזור לדף הבית</Link>
          </div>
          <div>
            <img src={SnakeImage} alt="snake" className='imgGame' />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
