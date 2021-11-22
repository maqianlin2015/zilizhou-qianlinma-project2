import React, { useState } from 'react';
import { CreatePlayer } from './Player';
import Introduction from './components/Introduction';
import NewGame from './components/NewGame';
import Game from './components/Game';
import FreePlayerGame from './components/FreePlayerGame';
import Announcer from './components/Announcer';
import './style/App.css';
import { useSelector, useDispatch } from "react-redux";


const App = () => {
	let PlayerOne = CreatePlayer('human-player', 'human');
	let PlayerTwo = CreatePlayer('ai-player', 'computer');
	let timeout = 1000;


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
