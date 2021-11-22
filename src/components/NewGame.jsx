import React from 'react';
import '../style/Intro.css';
import {useSelector, useDispatch} from "react-redux";
import {changeAppStatus, changeWinner} from "../redux/actions";

const NewGame = () => {
	const newAppStatus = useSelector(state => state.newAppStatus);
	const dispatch = useDispatch();
  
	const onStartNormalGame = () => {
		dispatch(changeAppStatus("game"));
		dispatch(changeWinner(null));
	};

	const onStartFreePlayerGame = () => {
		dispatch(changeAppStatus("freeplayergame"));
		dispatch(changeWinner(null));
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
