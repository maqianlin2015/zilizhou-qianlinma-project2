import React from 'react';
import PropTypes from 'prop-types';
import '../style/Intro.css';

const NewGame = ({ setAppStatus, setWinner }) => {
	const onStartNormalGame = () => {
		setAppStatus('game');
		setWinner(null);
	};

	const onStartFreePlayerGame = () => {
		setAppStatus('freeplayergame');
		setWinner(null);
	};

	return (
		<div>
			{/* <div className="new-game">
				<div className="new-game-wrapper"></div>
			</div> */}
			{/* <button className="new-game-btn star-btn" onClick={onStartGame}> */
			/*添加了div classname buttons和对应的intro.css style*/}
			<div className="buttons">
			<button className="normal-game-btn" onClick={onStartNormalGame}>
				Normal Game
			</button>
			{/*add space between two buttons*/}
			<div id="divider" />
			{/* <button className="start-free-player-game-btn star-btn" onClick={onStartGame}> */}
			<button className="free-player-game-btn" onClick={onStartFreePlayerGame}>
				{/* free player btn 还没有对应的comp+func，写完了normal回来改 */}
				Free Player Game
			</button>
			</div>
		</div>
	);
};

export default NewGame;

NewGame.propTypes = {
	setAppStatus: PropTypes.func.isRequired,
	setWinner: PropTypes.func.isRequired,
};
