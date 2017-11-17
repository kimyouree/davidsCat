import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MouseObject from './MouseObject'; 
import CatObject from './CatObject'; 

// set inital velocity and acceleration
const velocity = 12;
const initialCycleLength = 100;
const acceleration = 0.96;
const catW = 70;
const catH = 70;
const mouseW = 50;
const mouseH = 50;

class App extends Component {
  constructor(){
    super(); 

    this.state = {
        mousePos: {
          x: 0,
          y:0
        },
        catPos: {
          x:0, 
          y:0
        },
        catCycle: initialCycleLength,
        startTime: 0,
        currentTime: 0,
        bestTime: 0,
        casualMode: false,
    }
    this.getMousePos = this.getMousePos.bind(this);
    this.moveMouseObject = this.moveMouseObject.bind(this); 
    this.moveCatObject = this.moveCatObject.bind(this); 
    this.resetVel = this.resetVel.bind(this); 
    this.checkWallCollision = this.checkWallCollision.bind(this); 
    this.endGame = this.endGame.bind(this);
    this.toggleCasualMode = this.toggleCasualMode.bind(this);
 }

 // get the mouse/cursor coordinates
getMousePos(e){
    this.setState({
      mousePos: {
        x: e.clientX, 
        y: e.clientY 
      }
    })
}

// function to position the mouse relative to the cursor 
moveMouseObject(){
  let mouseObject=document.getElementById('mouse-object'); 
  mouseObject.style.left = this.state.mousePos.x + 'px'; 
  mouseObject.style.top = this.state.mousePos.y + 'px'; 
}

// start the timer, start moving mouse and cat 
componentDidMount(){
  window.addEventListener("mousemove", this.getMousePos);
  setInterval(this.moveMouseObject, 30);
  this.moveCatObject();
  this.setState({
     startTime: Date.now(),
  },
  () => {
     setInterval(()=>{
          this.setState({
               currentTime: (Date.now() - this.state.startTime)/1000,
          })
     }, 30)
  })
}
catch(err) { console.log('uh-oh you has an error!');}

// move the cat according to its position in state
componentDidUpdate(prevProps, prevState){
  if(JSON.stringify(prevState.catPos)!==JSON.stringify(this.state.catPos)){
    let catObject=document.getElementById('cat-object'); 
    catObject.style.left = this.state.catPos.x + 'px'; 
    catObject.style.top = this.state.catPos.y + 'px';
    this.checkWallCollision();
    this.endGame();
  }
}

// cat object follows mouse object, accelerates over time
moveCatObject(){
  let catPos = this.state.catPos;
  let mousePos = this.state.mousePos;
  let dirX = 0;
  let dirY = 0;
  let margin = 5;
  if(catPos.x - mousePos.x > margin){
    dirX = -1;
  }
  else if(catPos.x - mousePos.x < -margin){
    dirX = 1;
  }
  if(catPos.y - mousePos.y > margin){
    dirY = -1;
  }
  else if(catPos.y - mousePos.y < -margin){
    dirY = 1;
  }
  this.setState({
    catPos: {
      x: catPos.x + velocity * dirX, 
      y: catPos.y + velocity * dirY
    },
    catCycle: Math.max(this.state.catCycle * acceleration, 30),
  },
  ()=>{
     setTimeout(this.moveCatObject, this.state.catCycle);
  });
}

// check to see if cat hit a wall
checkWallCollision(){
  const d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  x = e.clientWidth || g.clientWidth,
  y = e.clientHeight|| g.clientHeight,
  catPos = this.state.catPos,
  wallMargin = 20
  if(catPos.x <= wallMargin || x - catPos.x <= wallMargin || catPos.y <= wallMargin || y - catPos.y <= wallMargin){
    this.resetVel(); 
  }
}

// resets cat velocity 
resetVel(){
  this.setState({
     catCycle: initialCycleLength,
  })
}

// end the game, record the time elapsed
endGame(){
     const catX = this.state.catPos.x,
          catY = this.state.catPos.y,
          mouseX = this.state.mousePos.x,
          mouseY = this.state.mousePos.y;
     if(((catX >= mouseX && catX <= mouseX + mouseW) || (catX + catW >= mouseX && catX + catW <= mouseX + mouseW)) 
     && ((catY >= mouseY && catY <= mouseY + mouseH) || (catY + catH >= mouseY && catY + catH <= mouseY + mouseH))
     && !this.state.casualMode){
          this.setState({
               catPos: {
                    x:0, 
                    y:0
               },
               catCycle: initialCycleLength,
               startTime: Date.now(),
               bestTime: Math.max(this.state.currentTime, this.state.bestTime),
          });
     }
}

// hide timer and disable game end in casual mode
toggleCasualMode(){
     if(this.state.casualMode){
          this.setState({
               casualMode: false,
               bestTime: 0,
               startTime: Date.now(),
               catPos: {
                    x:0, 
                    y:0
               },
          })
     }
     else{
          this.setState({
               casualMode: true,
               catPos: {
                    x:0, 
                    y:0
               },
          });
     }
}

  render() {
    return (
      <div className="App">

        <div>
        <h1 className="title">Super Kat</h1>
        <p className="timer-text" hidden={this.state.casualMode}>Current Time: <span className="timer-width">{this.state.currentTime}</span> s</p>
        <p className="timer-text" hidden={this.state.casualMode}>Best Time: {this.state.bestTime} s</p>
        <button className="button-style" onClick={this.toggleCasualMode}>{this.state.casualMode ? 'Normal Mode' : 'Casual Mode'}</button>
        <MouseObject mouseW={mouseW} mouseH={mouseH}/>
        <CatObject catW={catW} catH={catH}/>
        </div>

      </div>
    );
  }
}

export default App;
