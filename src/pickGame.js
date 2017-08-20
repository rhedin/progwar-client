import React, { Component } from 'react';

class PickGame extends Component {
    constructor(props) {
        super(props);
        this.loadGameFile = this.loadGameFile.bind(this);
    }
    
    render() {
        return (
            <div>
                PICK GAME!<br />
                {/*
                <!-- 
                list the games that already exist<br>
                It turns out that if you say <br>, in the cloud9 
                editor at least, Parsing error: Unterminated JSX contents
                Further more, <!-- --> is not allowed within JSX. 
                -->
                */}
                list the games that already exist<br />
                <ol>
                {
                    this.props.gameContracts.map(game => 
                        <li key={game.name}>{game.name}</li>
                    )
                }
                </ol>
                load a file that contains a new game<br />
                <input type="file" className="button" id="getGameFile" style={ {display:'none'} } onChange={this.loadGameFile} />
                <label htmlFor="getGameFile">Choose file</label>
                {/* This label badly needs styling. */}
            </div>
        );
    }
    
    loadGameFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(e.target.result);
            this.sendGameToServer(e.target.result);
        };
        reader.readAsText(file);
        event.target.value = '';
    }
    
    sendGameToServer(fileText) {
        fetch('https://progwar-server-rhedin.c9users.io/gameToServer', {
        // fetch('https://game-rhedin.c9users.io/sendInfo', {
            method: 'POST',
        })
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                return Promise.reject({
                    ok: resp.ok,
                    status: resp.status,
                    statusText: resp.statusText,
                });
            }
        })
        .catch(error => {
            console.log('function: sendGameToServer  error: fetch failed');
            console.log(error);
        });
    }
}

export default PickGame;