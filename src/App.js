import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CreatePlayer } from './Player';
import Introduction from './components/Introduction';
import NewGame from './components/NewGame';
import Game from './components/Game';
import FreePlayerGame from './components/FreePlayerGame';
import Announcer from './components/Announcer';
import './style/App.css';

const App = () => {
	const [appStatus, setAppStatus] = useState('intro');
	const [winner, setWinner] = useState(null);
	let PlayerOne = CreatePlayer('human-player', 'human');
	let PlayerTwo = CreatePlayer('ai-player', 'computer');
	let timeout = 2000;

	return (
		<div>
			<CSSTransition
				in={appStatus === 'intro'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
				onExited={() => setAppStatus('newGame')}
			>
				<Introduction setAppStatus={setAppStatus} appStatus={appStatus} />
			</CSSTransition>
			<CSSTransition
				in={appStatus === 'newGame'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
			>
				<NewGame setAppStatus={setAppStatus} setWinner={setWinner} />
			</CSSTransition>
			
			<CSSTransition
				in={appStatus === 'game'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
			>
				<Game
					player={PlayerOne}
					opponent={PlayerTwo}
					setWinner={setWinner}
					winner={winner}
					setAppStatus={setAppStatus}
				/>
			</CSSTransition>
	
			{/* freeplayergame */}
			<CSSTransition
				in={appStatus === 'freeplayergame'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
			>
				<FreePlayerGame
					player={PlayerOne}
					opponent={PlayerTwo}
					setWinner={setWinner}
					winner={winner}
					setAppStatus={setAppStatus}
				/>
			</CSSTransition>

			<CSSTransition
				in={appStatus === 'announcer'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
			>
				<Announcer winner={winner} setAppStatus={setAppStatus} />
			</CSSTransition>
		</div>
	);
};

export default App;
