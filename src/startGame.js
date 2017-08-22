import React, { Component } from 'react';

class StartGame extends Component {
    render() {
        return (
            <div>
                START GAME!<br />
                |{this.props.getSquareString(0,0)}|{this.props.getSquareString(1,0)}|{this.props.getSquareString(2,0)}|<br />
                |{this.props.getSquareString(0,1)}|{this.props.getSquareString(1,1)}|{this.props.getSquareString(2,1)}|<br />
                |{this.props.getSquareString(0,2)}|{this.props.getSquareString(1,2)}|{this.props.getSquareString(2,2)}|<br />
                {/* If this were a language that had 2-D arrays, this would be this.props.board[0,0] */}
            </div>
        );
    }
}

export default StartGame;