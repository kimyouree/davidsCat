import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MouseObject from './MouseObject'; 
import CatObject from './CatObject'; 

// set inital velocity and acceleration
const velocity = 10;
const initialCycleLength = 100;
const acceleration = 0.98;
const catW = 100;
const catH = 50;
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
    }
    this.getMousePos = this.getMousePos.bind(this);
    this.moveMouseObject = this.moveMouseObject.bind(this); 
    this.moveCatObject = this.moveCatObject.bind(this); 
    this.resetVel = this.resetVel.bind(this); 
//     this.accelerate = this.accelerate.bind(this); 
    this.checkWallCollision = this.checkWallCollision.bind(this); 
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

// start moving mouse and cat 
componentDidMount(){
  window.addEventListener("mousemove", this.getMousePos);
  setInterval(this.moveMouseObject, 30);
  this.moveCatObject();
}
catch(err) { console.log('uh-oh you has an error!');}

// move the cat according to its position in state
componentDidUpdate(prevProps, prevState){
  if(JSON.stringify(prevState.catPos)!==JSON.stringify(this.state.catPos)){
    let catObject=document.getElementById('cat-object'); 
    catObject.style.left = this.state.catPos.x + 'px'; 
    catObject.style.top = this.state.catPos.y + 'px';
    this.checkWallCollision();  
  }
}

// cat object follows mouse object 
moveCatObject(){
  let catPos = this.state.catPos;
  let mousePos = this.state.mousePos;
  let dirX = 0;
  let dirY = 0;
  let margin = 3;
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
  catPos = this.state.catPos
  if(catPos.x<=10 || x - catPos.x <=10 || catPos.y <= 10 || y - catPos.y <= 10){
    this.resetVel(); 
  }
}

// resets cat velocity 
resetVel(){
  this.setState({
     catCycle: initialCycleLength,
  })
}

// // accelerate the cat
// accelerate(){
//   this.setState({
//     catCycle: Math.max(this.state.catCycle * acceleration, 30),
//   }, 
//   ()=>{
//     setTimeout(this.accelerate, this.state.catCycle);
//   })
// }

// end the game
// endGame(){
//      const catX = this.state.catPos.x,
//           catY = this.state.catPos.y,

//      if((||) && (||))
// }

  render() {
    return (
      <div className="App">
        <h1 className="title">DAVIDsCAT</h1>
        <MouseObject mouseW={mouseW} mouseH={mouseH}/>
        <CatObject catW={catW} catH={catH}/>
      </div>
    );
  }
}

export default App;
