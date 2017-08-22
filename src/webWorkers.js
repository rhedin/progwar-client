import React, { Component } from 'react';
// import * as referee from './referee';

class WebWorkers extends Component {
    
    referee = null;
    player1 = null;
    player2 = null;
    // I'm shocked that this is how you define a data member.
    // I was expecting let myvar, or var myvar. 
    
    constructor(props) {
        super(props);
        this.startWebworkers = this.startWebworkers.bind(this);
        this.doGame = this.doGame.bind(this);
        this.refereeReceiveMessage = this.refereeReceiveMessage.bind(this);
        this.player1ReceiveMessage = this.player1ReceiveMessage.bind(this);
        this.player2ReceiveMessage = this.player2ReceiveMessage.bind(this);
    }
    
    render() {
        return (
            <div>
                From here, we're going to make web workers do something for us!<br />
                <button onClick={this.startWebworkers}>Start the Webworkers!</button>
                <button onClick={this.doGame}>Start game</button>
            </div>
        );
    }
    
    startWebworkers() {
        alert('In startWebworkers!');
        
        // Create webworker 1.
        
        // We'll want to do the blob rigamarole when we're really doing it, 
        // but for now we'll load in a file.
        
        var worker1 = new Worker('worker1.js');
        worker1.addEventListener('message', function (e) {
            console.log(`Worker 1 said "${e.data}"`);
        }, false);
        
        // Create webworker 2. 
        var worker2 = new Worker('worker2.js');
        worker2.addEventListener('message', function (e) {
            console.log(`Worker 2 said "${e.data}"`);
        }, false);
        
        // Start both workers. 
        
        // I believe both workers are idle until they receive their first message.
        
        worker1.postMessage('Hello, worker 1!');
        worker2.postMessage('Hello, worker 2!');
        
    }
    
    doGame() {
        
        // Establish all three web workers.

        this.referee = new Worker('refereeWorker.js');
        this.referee.addEventListener('message', this.refereeReceiveMessage, false);
        
        this.player1 = new Worker('player1worker.js');
        this.player1.addEventListener('message', this.player1ReceiveMessage, false);
        
        this.player2 = new Worker('player2worker.js');
        this.player2.addEventListener('message', this.player2ReceiveMessage, false);
        
        // Request contract from contract web worker. 
        
        this.referee.postMessage({
            cmd: 'getContract',
        });
    }
    // For now, we're assuming that both players politely wait until 
    // the conductor asks them for their move.
    
    
    refereeReceiveMessage(e) {
        switch(e.data.cmd) {
            case 'returningContract':
                console.log(`message to referee - returningContract`);
                this.props.initBoard(e.data.contract);
                this.player1.postMessage({
                    cmd: 'getMove',
                });
                break;
            default: 
                console.log(`Unrecognized commmand from referee:  ${e.data.cmd}`);
                break;
        }
    }
    
    
    player1ReceiveMessage(e) {
        switch(e.data.cmd) {
            case 'getMove':
                console.log(`Got move from player1:  e.data.move = ${e.data.move}`);
                break;
            default: 
                console.log(`Unrecognized commmand from player1:  ${e.data.cmd}`);
                break;
        }
    }
    
    
    player2ReceiveMessage(e) {
        
    }
}

export default WebWorkers;