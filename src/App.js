import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Link,
  Route, 
  Redirect
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
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
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
          <Route path="/startGame" component={StartGame} />
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
          <Route
            path="/home"
            render={() => 
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
  
  initBoard(contract) {
    console.log(`In initBoard in app component.  contract=${contract}`);
  }
}

export default App;
