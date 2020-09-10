import React from 'react';

const PlayAgain = (props) => (
    <div className="game-done">
        <div 
            className="message"
            style={{ color: props.gameStatus === 'lost' ? 'lightcoral' : 'lightgreen'}}
        >
            {props.gameStatus === 'lost' ? 'Game Over' : 'You win!!'}
        </div>
        <button 
        onClick={props.onClick}
        style = {{
            backgroundColor: "lightblue",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "10px"
        }}>Play Again</button>
    </div>
)

export default PlayAgain;

