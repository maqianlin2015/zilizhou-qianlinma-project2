import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {changeAppStatus} from "../redux/actions";


const Announcer = () => {
	const newWinner = useSelector(state => state.newWinner);
	const dispatch = useDispatch();

	const onPlayAgain = () => {
		dispatch(changeAppStatus('newGame'));
	};

	return (
		<div>
			<div className={`announcer ${newWinner.side}`}>
				<h1>Game Over! {newWinner.name} Won!</h1>
			</div>

			<button className="new-game-btn star-btn" onClick={onPlayAgain}>
				Play again!
			</button>
		</div>
	);
};

export default Announcer;
