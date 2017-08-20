import React, { Component } from 'react';

class PickGame extends Component {
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
            </div>
        );
    }
    
    loadGameFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(e.target.result);
        };
        reader.readAsText(file);
        // event.target.value = file.name + ' loaded';
        event.target.value = '';
    }
}

export default PickGame;