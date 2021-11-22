import React, { useEffect, useState } from 'react';
// import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import '../style/Game.css';
import GameBoard from './GameBoard';
import {useSelector, useDispatch} from "react-redux";
import {changeAppStatus, changeWinner} from "../redux/actions";

const FreePlayerGame = (props) => {
	const newAppStatus = useSelector(state => state.newAppStatus);
	const newWinner = useSelector(state => state.newWinner);
	const dispatch = useDispatch();

	const { player, opponent } = props;
	const [isGameReady, setGameReady] = useState(true);
	const [board, setBoard] = useState([...player.gameBoard.board]);
	const [opponentBoard, setOpponentBoard] = useState([
		...opponent.gameBoard.board,
	]);
	const [EnemyShipCount, setEnemyShipCount] = useState(
		opponent.gameBoard.shipCount
	);

	useEffect(() => {
		handlePlayerShipDisplay();
	}, [board]);

	useEffect(() => {
		handleComputerShipDisplay();
	}, [EnemyShipCount]);

	const onMakeMove = (e) => {
		const y = e.target.dataset.cord.split(',')[0];
		const x = e.target.dataset.cord.split(',')[1];
		if (player.makeMove(opponent, x, y) === true) {
			setOpponentBoard([...opponent.gameBoard.board]);
			setEnemyShipCount(opponent.gameBoard.shipCount);
			// console.table(opponentBoard);
			if (opponent.gameBoard.isGameOver) {
				onEndGame(player);
			}
			onAIMove();
		}
	};

	const onAIMove = () => {
		opponent.makeAIMove(player, false);
		setBoard([...player.gameBoard.board]);
		// console.table(board);
		if (player.gameBoard.isGameOver) {
			onEndGame(opponent);
		}
	};

	const onEndGame = (newWinner) => {
		setTimeout(() => {
			dispatch(changeWinner(newWinner));
			dispatch(changeAppStatus('announcer'));
		}, 500);
	};

	const handlePlayerShipDisplay = () => {
		player.gameBoard.ships.map((ship) => {
			mountShip(player, ship);
		});
	};

	const handleComputerShipDisplay = () => {
		opponent.gameBoard.ships.map((ship) => {
			if (ship.isSunk() === true) {
				mountShip(opponent, ship);
			}
		});
	};

	const mountShip = (owner, ship) => {
		if (ship.onBoard) {
			const cords = [ship.coordinates[1], ship.coordinates[0]];
			const boardDiv = document.querySelector(`.${owner.side}`);
			const startingCell = boardDiv.querySelector(`div[data-cord="${cords}"]`);
			if (!startingCell.querySelector('.ship-img-grid')) {
				const shipImg = document.createElement('img');
				shipImg.src =
					// eslint-disable-next-line no-undef
					process.env.PUBLIC_URL + `/images/${owner.side}${ship.size}.png`;
				shipImg.alt = `ship-${owner.side}${ship.size}`;
				shipImg.classList.add(`ship-img-grid`);
				shipImg.classList.add(ship.direction);
				shipImg.targetAble = false;
				startingCell.appendChild(shipImg);
			}
		}
	};

	return (
		<div>
				<div className="game">
					<GameBoard
						player={opponent}
						board={opponentBoard}
						onMakeMove={onMakeMove}
						isGameReady={isGameReady}
					/>
				</div>
		</div>
	);
};

export default FreePlayerGame;

FreePlayerGame.propTypes = {
	player: PropTypes.object,
	board: PropTypes.array,
	setBoard: PropTypes.func,
	opponent: PropTypes.object,
	opponentBoard: PropTypes.array,
	setOpponentBoard: PropTypes.func,
	PlayerOne: PropTypes.object,
	PlayerTwo: PropTypes.object,
	gameReady: PropTypes.bool,
	setGameReady: PropTypes.func,
	winner: PropTypes.object,
	setWinner: PropTypes.func,
	setAppStatus: PropTypes.func,
};

FreePlayerGame.defaultProps = {
	setBoard: () => {},
	setOpponentBoard: () => {},
	gameReady: false,
	setGameReady: () => {},
	setWinner: () => {},
	setAppStatus: () => {},
};
