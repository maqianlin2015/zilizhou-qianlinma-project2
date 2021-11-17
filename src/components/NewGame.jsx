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
		<div className="neon-btn">
			<div className="">
				<button className="btn one" onClick={onStartNormalGame}>
					Game
				</button>
				<div id="divider" />
				<br/>
				<br/>
				<button className="btn one" onClick={onStartFreePlayerGame}>
					Try Free Player Game
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
