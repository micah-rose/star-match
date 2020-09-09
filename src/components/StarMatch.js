import React, {useState} from 'react';
import Game from './Game';

const StarMatch = () => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} newGame={console.log('Button clicked')}/>;
}

//() => setGameId(gameId + 1)

//https://jscomplete.com/playground/rgs3.9 >> Finished code for this project, will need it to figure out what I am missing in my code

export default StarMatch;