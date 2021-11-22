import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/Game.css';
import GameBoard from './GameBoard';
import {useSelector, useDispatch} from "react-redux";
import {changeAppStatus, changeWinner} from "../redux/actions";

const Game = (props) => {
	const newAppStatus = useSelector(state => state.newAppStatus);
	const newWinner = useSelector(state => state.newWinner);
	const dispatch = useDispatch();

	const { player, opponent } = props;
	const [isGameReady, setGameReady] = useState(false);
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

	const onPlaceRandomly = () => {
		onResetBoard();
		player.gameBoard.placeShipsAtRandom();
		setBoard([...player.gameBoard.board]);
	};

	const onFlipShips = () => {
		player.gameBoard.ships.forEach((ship) => {
			if (!ship.onBoard) player.gameBoard.changeShipDirection(ship);
		});
		setBoard([...player.gameBoard.board]);
		document.querySelector('.ship-wrapper').classList.toggle('flipped');
	};

	const onResetBoard = () => {
		player.gameBoard.makeBoard();
		player.gameBoard.getShips();
		setBoard([...player.gameBoard.board]);
	};

	const onPlaceShip = (e) => {
		const y = e.target.dataset.cord.split(',')[0];
		const x = e.target.dataset.cord.split(',')[1];
		const shipID = e.dataTransfer.getData('ship');
		const ship = player.gameBoard.ships[shipID - 1];
		player.gameBoard.placeShip(ship, x, y);
		setBoard([...player.gameBoard.board]);
	};

	const onStartGame = () => {
		if (player.gameBoard.isReady) setGameReady(true);
	};

	const onMakeMove = (e) => {
		const y = e.target.dataset.cord.split(',')[0];
		const x = e.target.dataset.cord.split(',')[1];
		if (player.makeMove(opponent, x, y) === true) {
			setOpponentBoard([...opponent.gameBoard.board]);
			setEnemyShipCount(opponent.gameBoard.shipCount);
			if (opponent.gameBoard.isGameOver) {
				onEndGame(player);
			}
			onAIMove();
		}
	};

	const onAIMove = () => {
		opponent.makeAIMove(player, false);
		setBoard([...player.gameBoard.board]);
		if (player.gameBoard.isGameOver) {
			onEndGame(opponent);
		}
	};

	const onEndGame = (newWinner) => {
		setTimeout(() => {
			dispatch(changeWinner(newWinner));
			dispatch(changeAppStatus('announcer'));
		}, 500);
		// console.log(newWinner);
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
			{isGameReady ? (
				<div className="game">
					<GameBoard player={player} board={board} isGameReady={isGameReady} />
					<GameBoard
						player={opponent}
						board={opponentBoard}
						onMakeMove={onMakeMove}
						isGameReady={isGameReady}
					/>
				</div>
			) : (
				<div className="game">
					<GameBoard
						player={player}
						board={board}
						isGameReady={isGameReady}
						setGameReady={setGameReady}
						onFlipShips={onFlipShips}
						onPlaceShip={onPlaceShip}
						onPlaceRandomly={onPlaceRandomly}
						onResetBoard={onResetBoard}
						onStartGame={onStartGame}
					/>
				</div>
			)}
		</div>
	);
};

export default Game;