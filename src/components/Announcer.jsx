import React from 'react';
import PropTypes from 'prop-types';

const Announcer = ({ winner, setAppStatus }) => {
	const onPlayAgain = () => {
		setAppStatus('newGame');
	};

	return (
		<div>
			<div className={`announcer ${winner.side}`}>
				<h1>Game Over! {winner.name} Won!</h1>
				{winner.side === 'human-player'}
				{winner.side === 'ai-player'}
			</div>
			
			<button className="new-game-btn star-btn" onClick={onPlayAgain}>
				Play again!
			</button>
		</div>
	);
};

export default Announcer;

Announcer.propTypes = {
	winner: PropTypes.object,
	// winner: PropTypes.object.isRequired,
	setAppStatus: PropTypes.func.isRequired,
};
