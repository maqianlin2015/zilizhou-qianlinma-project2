import React, { useState } from 'react';
import { CreatePlayer } from './Player';
import Introduction from './components/Introduction';
import NewGame from './components/NewGame';
import Game from './components/Game';
import FreePlayerGame from './components/FreePlayerGame';
import Announcer from './components/Announcer';
import './style/App.css';

import { Provider } from "react-redux";
import store from "../src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { changeAppStatus } from './redux/actions';


const App = () => {

	// const [appStatus, setAppStatus] = useState('intro');
	// const [winner, setWinner] = useState(null);
	let PlayerOne = CreatePlayer('human-player', 'human');
	let PlayerTwo = CreatePlayer('ai-player', 'computer');
	//update timeout from 2000 to 20//
	let timeout = 20;


	const newAppStatus = useSelector(state => state.newAppStatus);
	const dispatch = useDispatch();

	if (newAppStatus == "intro") {
		return (
			<Introduction />
		)
	} else if (newAppStatus == "newGame") {
		return (
			<NewGame />
		)
	} else if (newAppStatus == "game") {
		return (
			<Game
				player={PlayerOne}
				opponent={PlayerTwo}
			/>
		);
	} else if (newAppStatus == "freeplayergame") {
		return (
			<FreePlayerGame
					player={PlayerOne}
					opponent={PlayerTwo}
				/>
		);
	} else if (newAppStatus == "announcer") {
		return <Announcer/>
	}
};

export default App;
