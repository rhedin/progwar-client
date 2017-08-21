import React, { Component } from 'react';

class WebWorkers extends Component {
    constructor(props) {
        super(props);
        this.startWebworkers = this.startWebworkers.bind(this);
        this.doGame = this.doGame.bind(this);
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
        
        var referee = new Worker('referee.js');
        referee.addEventListener('message', referee.receiveMessage, false);
        
        var player1 = new Worker('player1.js');
        player1.addEventListener('message', player1.receiveMessage, false);
        
        var player2 = new Worker('player2.js');
        player2.addEventListener('message', player2.receiveMessage, false);
        
        // Get contract from contract web worker. 
        
        var contract = await referee.getContract();
        
        // Inform game of initial board.  Includes number of squares.
        
        this.props.initBoard(contract);
        
        // In loop.
        
        while (true) {
            var move;
            var verdict;
        
            // Get move from player 1 worker.  Ask referee whether legal. 
            // Inform game of move.  This could end the game. 
            
            move = await player1.getMove(this.props.board);
            verdict = await referee.evalMove(this.props.board, move);
            this.props.movePieces(move, verdict);
            if (verdict.gameOver) {
                console.log('Game over.');
                break;
            }
            
            // Get move from player 2 worker. 
            
            move = await player2.getMove(this.props.board);
            verdict = await referee.evalMove(this.props.board, move);
            this.props.movePieces(move, verdict);
            if (verdict.gameOver) {
                console.log('Game over.');
                break;
            }
        }
            
        // Stop all three web workers.

        referee.terminate();
        player1.terminate();
        player2.terminate();

    }
    // For now, we're assuming that both players politely wait until 
    // the conductor asks them for their move.
}

export default WebWorkers;