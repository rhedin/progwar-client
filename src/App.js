import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Link,
  Route, 
} from 'react-router-dom';
import PickGame from './pickGame';
import PickBots from './pickBots';
import StartGame from './startGame';
import WebWorkers from './webWorkers';

class App extends Component {
  
  constructor() {
    super();
    this.state = this.initState();
    this.initBoard = this.initBoard.bind(this);
    this.getSquare = this.getSquare.bind(this);
    this.getSquareString = this.getSquareString.bind(this);
    this.setSquare = this.setSquare.bind(this);
    this.board = [];
    this.xdim = 0;
    this.ydim = 0;
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>

          <div>
            <Link to="pickGame">Pick the game to play.</Link><br />
                (From there, you can also upload a new game contract)<br />
            <Link to="pickBots">Pick the two opponents.  Both must be computer programs.</Link><br />
                (From there, you can also upload a computer program)<br />
            <Link to="startGame">Start the game.</Link><br />
            (At some point, the game will terminate, and you will be given the <br />
            option to come back here)<br />
            <Link to="webWorkers">Try web workers.</Link><br />
          </div>

          {/*
          This doesn't pass the props.  Using render= rather than component= is designed for that.
          <Route path="/pickGame" component={PickGame} gameContracts={this.state.gameContracts} />
          */}
          <Route 
            path="/pickGame"
            render={
              (props) => (
                <PickGame
                  {...props}
                  gameContracts={this.state.gameContracts}
                />
              )
            }
          />
          
          <Route path="/pickBots" component={PickBots} />
          <Route 
            path="/startGame" 
            render={
              (props) => (
                <StartGame 
                  {...props}
                  getSquareString={this.getSquareString}
                />
              )
            }
          />
          {/* <Route path="/webWorkers" component={WebWorkers} /> */}
          <Route
            path="/webWorkers"
            render={
              (props) => (
                <WebWorkers
                  {...props}
                  initBoard={this.initBoard}
                />
              )
            }
          />
        </div>
      </BrowserRouter>
    );
  }
  
  initState() {
    return {
      gameContracts: [
        {
          name: 'tictactoe'
        },
        {
          name: 'reversi'
        },
        {
          name: 'go'
        }
      ]
    }
  }
    
  getSquare(x, y) {
    console.log(`getSquare ${this.xdim}`);
    return this.board[this.xdim * y + x];
  }
  
  getSquareString(x, y) {
    console.log(`getSquareString ${this.xdim}`);
    var square = this.getSquare(x, y);
    return square === null ? '    ' : `${square.playerNumber}-${square.pieceNumber}`;
  }
  
  // position is {playerNumber, x, y, pieceNumber}
  setSquare(x, y, position) {
    console.log(`setSquare ${this.xdim}`);
    this.board[this.xdim * y + x] = position;
  }
  // And this would be a good place for a typescript-style shape definition.
  
  initBoard(contract) {
    console.log(`initBoard ${this.xdim}`);
    console.log(`In initBoard in app component.  contract=${JSON.stringify(contract)}`);
    this.xdim = contract.xdim;
    this.ydim = contract.ydim;
    for (let x = 0; x < this.xdim; x++) {
      for (let y = 0; y < this.ydim; y++) {
        this.setSquare(x, y, null);
      }
    }
    for (let position of contract.player1initialPositions) {
      this.setSquare(position.x, position.y, {playerNumber: position.playerNumber, pieceNumber: position.pieceNumber});
    }
    for (let position of contract.player2initialPositions) {
      this.setSquare(position.x, position.y, {playerNumber: position.playerNumber, pieceNumber: position.pieceNumber});
      // Good place for spread assignment.  Oh, well.
    }
    console.log(`When leaving initBoard ${this.xdim}`);
  }
}

export default App;
