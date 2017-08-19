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
                <input type="file" />
            </div>
        );
    }
}

export default PickGame;