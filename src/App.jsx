import rockImage from './assets/rock-emoji.png';
import paperImage from './assets/paper-emoji.png';
import scissorImage from './assets/scissors-emoji.png';
import { useState, useEffect } from 'react';

function App() { 
    // State to manage images for computer and player
    const [image, setImage] = useState({ computer: rockImage, player: paperImage });

    // State to manage the game score and result
    const [game, setGame] = useState({
        win: 0,
        lose: 0,
        tie: 0,
        result: ''
    });

    // State to manage random play mode and interval ID for auto-play
    const [random, setRandom] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    // Function to reset the game score and result
    const reset = () => {
        setGame({
            win: 0,
            lose: 0,
            tie: 0,
            result: 'result'
        });
    };

    // Array of possible moves
    const moves = ['rock', 'paper', 'scissor'];

    // Function to toggle random play mode
    const randomPlay = () => {
        setRandom(prevRandom => {
            const newRandom = !prevRandom;

            if (newRandom) {
                // Start auto-play by setting an interval to play random moves
                const newIntervalId = setInterval(() => {
                    let computerMove = moves[Math.floor(Math.random() * 3)];
                    play(computerMove);
                }, 1000); // Play every 1 second
                setIntervalId(newIntervalId); // Save interval ID for later clearing
            } else {
                // Stop auto-play by clearing the interval
                clearInterval(intervalId);
                setIntervalId(null);
            }

            return newRandom;
        });
    };

    // Clear the interval if the component unmounts
    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    // Function to play a round with the chosen player move
    const play = (playerMove) => {
        const computerMove = moves[Math.floor(Math.random() * 3)];
        let computerImage, playerImage;

        // Determine images and game result based on player and computer moves
        switch (playerMove) {
            case 'rock':
                playerImage = rockImage;
                if (computerMove === 'rock') {
                    computerImage = rockImage;
                    setGame(g => ({ ...g, tie: g.tie + 1, result: 'Tie' }));
                } else if (computerMove === 'paper') {
                    computerImage = paperImage;
                    setGame(g => ({ ...g, lose: g.lose + 1, result: 'Lose' }));
                } else {
                    computerImage = scissorImage;
                    setGame(g => ({ ...g, win: g.win + 1, result: 'Win' }));
                }
                break;
            case 'paper':
                playerImage = paperImage;
                if (computerMove === 'rock') {
                    computerImage = rockImage;
                    setGame(g => ({ ...g, win: g.win + 1, result: 'Win' }));
                } else if (computerMove === 'paper') {
                    computerImage = paperImage;
                    setGame(g => ({ ...g, tie: g.tie + 1, result: 'Tie' }));
                } else {
                    computerImage = scissorImage;
                    setGame(g => ({ ...g, lose: g.lose + 1, result: 'Lose' }));
                }
                break;
            case 'scissor':
                playerImage = scissorImage;
                if (computerMove === 'rock') {
                    computerImage = rockImage;
                    setGame(g => ({ ...g, lose: g.lose + 1, result: 'Lose' }));
                } else if (computerMove === 'paper') {
                    computerImage = paperImage;
                    setGame(g => ({ ...g, win: g.win + 1, result: 'Win' }));
                } else {
                    computerImage = scissorImage;
                    setGame(g => ({ ...g, tie: g.tie + 1, result: 'Tie' }));
                }
                break;
            default:
                break;
        }

        // Update the images for player and computer
        setImage({ player: playerImage, computer: computerImage });
    };

    return (
        <>
            <div className='game-container'>
                <h1 className='heading'>Rock Paper Scissor</h1>

                <div className='game-display'>
                    <div className='choice-display'>
                        <div>
                            <img className='choice-image' src={image.player} alt="player-choice" />
                            <div className='user-type'>Player</div>
                        </div>
                        <div>- vs -</div>
                        <div>
                            <img className='choice-image' src={image.computer} alt="computer-choice" />
                            <div className='user-type'>Computer</div>
                        </div>
                    </div>
                    <div className='result'>{game.result}</div>
                </div>

                <div className='button-container'>
                    <div className='choice-text'>Choose</div>
                    <div className='choice-buttons'>
                        <button className='choice-button' onClick={() => play('rock')}>
                            <img className='button-image' src={rockImage} alt="rock" />
                        </button>
                        <button className='choice-button' onClick={() => play('paper')}>
                            <img className='button-image' src={paperImage} alt="paper" />
                        </button>
                        <button className='choice-button' onClick={() => play('scissor')}>
                            <img className='button-image' src={scissorImage} alt="scissor" />
                        </button>
                    </div>
                </div>

                <div className='score-board'>
                    <h3 className='board-heading'>Score Count</h3>
                    <div className='board-cards'>
                        <div className='board-card'>
                            <div className='card-score'>{game.win}</div>
                            <p className='card-text'>Wins</p>
                        </div>
                        <div className='board-card'>
                            <div className='card-score'>{game.tie}</div>
                            <p className='card-text'>Ties</p>
                        </div>
                        <div className='board-card'>
                            <div className='card-score'>{game.lose}</div>
                            <p className='card-text'>Loses</p>
                        </div>
                    </div>
                </div>

                <div className='change-buttons'>
                    <button className='random-button' onClick={randomPlay}>
                        {random ? 'Stop Random Play' : 'Start Random Play'}
                    </button>
                    <button className='reset-button' onClick={reset}>Reset Score</button>
                </div>
            </div>
        </>
    );
}

export default App;
