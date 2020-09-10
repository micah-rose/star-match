import React, {useState, useEffect} from 'react';
import './StarMatch.css';
import utils from '../math-utils';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(
        () => setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1),
        1000
      );
      return () => clearTimeout(timerId);
    }
  }, [secondsLeft, availableNums]);

  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

const Game = (props) => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameStatus = 
      availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

    const numberStatus = (number) => {
        if (!availableNums.includes(number)){
            return 'used';
        }

        if (candidateNums.includes(number)){
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }

        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
      if (currentStatus === 'used' || secondsLeft === 0){
        return;
      }

      const newCandidateNums = 
        currentStatus === 'available'
          ? candidateNums.concat(number)
          : candidateNums.filter((cn) => cn !== number);
      
      setGameState(newCandidateNums);
    }

    return (
      <div className="game">
          <h1>Star Match Game</h1>
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {gameStatus !== 'active' ? (
              <PlayAgain onClick={props.newGame} gameStatus={gameStatus}/>
              ) : (
                <StarsDisplay count={stars} />
              )}        
          </div>
          <div className="right">
            {utils.range(1, 9).map((number) => (
                <PlayNumber 
                key={number} 
                number={number}
                status={numberStatus(number)} 
                onClick={onNumberClick}
              />
            ))}
          </div>
        </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };

export default Game;


