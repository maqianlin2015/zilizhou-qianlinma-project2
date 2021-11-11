import React from 'react';
import PropTypes from 'prop-types';

// import '../style/Intro.css';

const Introduction = ({ setAppStatus }) => {
	const onSkipIntro = () => {
		setAppStatus('newGame');
	};

	return (
		<div className="fade" >
			<section className="star-wars-intro" onClick={onSkipIntro}>
				<div className="crawl">
					<div className="title">
						<p>Rules</p>
						<h1>Battleships</h1>
					</div>
					{/* 格式不对，需要调格式 */}
					{/*<p>intro for pair game</p>*/}
					<p>The object of Battleship is to try and sink all of the other player's before they sink all of your ships. All of the other player's ships are somewhere on his/her board.  You try and hit them by calling out the coordinates of one of the squares on the board.  The other player also tries to hit your ships by calling out coordinates.  Neither you nor the other player can see the other's board so you must try to guess where they are.  Each board in the physical game has two grids:  the lower (horizontal) section for the player's ships and the upper part (vertical during play) for recording the player's guesses.</p>
					{/*<p>intro for pair game</p>*/}
					<br></br>
					<p className="p-s">Click to the Game</p>
				</div>
			</section>
		</div>
	);
};

export default Introduction;

Introduction.propTypes = {
	setAppStatus: PropTypes.func.isRequired,
};
