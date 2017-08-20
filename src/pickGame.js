import React, { Component } from 'react';
import 'whatwg-fetch';

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
            this.sendGameToServer(file.name, e.target.result);
        };
        reader.readAsText(file);
        event.target.value = '';
    }
    
    sendGameToServer(fileName, fileText) {
        fetch('https://progwar-server-rhedin.c9users.io/gameToServer', {
        // fetch('https://game-rhedin.c9users.io/sendInfo', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: fileName,
                text: fileText,
            }),
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
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('function: sendGameToServer  error: fetch failed');
            console.log(error);
        });
    }
}

export default PickGame;