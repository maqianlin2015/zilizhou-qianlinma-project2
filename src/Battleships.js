import {
	attackShip,
	checkDirectionalShipPlacement,
	markShipOnBoard,
	markShipArea,
	handleShipCount,
	randomlyPlaceShip,
} from './HelperFunctions';

const BOARD_SIDE_SIZE = 10;
const FLEET_QUANTITY = 5;

export const Ship = (name = 'ship', size = 1, direction = 'horizontal') => {
	const ship = {
		name,
		size,
		direction,
		hitState: Array(size).fill('o'),
		hit: () => {
			const nextHit = ship.hitState.findIndex((field) => field === 'o');
			ship.hitState[nextHit] = 'hit';
		},
		isSunk: () => !ship.hitState.includes('o'),
	};
	return ship;
};

export const GameBoard = (playerSide = 'human-player') => {
	const gameBoard = {
		side: playerSide,
		board: [],
		ships: [],
		shipCount: 0,
		isReady: false,
		isGameOver: false,

		emptyBoard: () => {
			return [
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
			];
		},
		makeBoard: () => {
			gameBoard.board = gameBoard.emptyBoard();
			gameBoard.shipCount = 0;
			gameBoard.isReady = false;
			gameBoard.isGameOver = false;
		},

		createShips: (playerSide = 'human-player') => {
			if (playerSide === 'ai-player') {
				return [
					Ship('myShip1', 2),
					Ship('myShip2', 3),
					Ship('myShip3', 3),
					Ship('myShip4', 4),
					Ship('myShip5', 5)
				];
			} else {
				return [
					Ship('opponentShip1', 2),
					Ship('opponentShip2', 3),
					Ship('opponentShip3', 3),
					Ship('opponentShip14', 4),
					Ship('opponentShip5', 5),
				];
			}
		},
		getShips: () => {
			const shipArray = gameBoard.createShips();
			shipArray.map((ship, id) => (ship.id = id + 1));
			gameBoard.ships = shipArray;
			return shipArray;
		},


		receiveAttack: (xCord, yCord) => {
			const val = gameBoard.board[yCord - 1][xCord - 1];
			if (val === '•' || val === '※') return false;
			if (val === '_' || val === '*') {
				gameBoard.board[yCord - 1][xCord - 1] = '•';
			} else if (Number.isInteger(parseInt(val))) {
				attackShip(gameBoard, xCord, yCord);
			}
			return true;
		},

		checkPlacement: (ship = {}, xCord = 0, yCord = 0) => {
			xCord = parseFloat(xCord);
			yCord = parseFloat(yCord);
			return checkDirectionalShipPlacement(
				gameBoard,
				ship,
				xCord,
				yCord,
				BOARD_SIDE_SIZE
			);
		},

		placeShip: (ship = {}, xCord = 0, yCord = 0) => {
			if (
				gameBoard.shipCount < FLEET_QUANTITY &&
				gameBoard.checkPlacement(ship, xCord, yCord)
			) {
				markShipOnBoard(ship, gameBoard, xCord, yCord);
				markShipArea('*', ship, gameBoard, xCord, yCord, BOARD_SIDE_SIZE);
				ship.onBoard = true;
				ship.coordinates = [parseFloat(xCord), parseFloat(yCord)];
				handleShipCount(gameBoard, FLEET_QUANTITY);
				return true;
			} else {
				return false;
			}
		},

		placeShipsAtRandom: () => {
			const reversedShips = [...gameBoard.ships].reverse();
			while (gameBoard.shipCount < FLEET_QUANTITY) {
				reversedShips.forEach((ship) => {
					randomlyPlaceShip(ship, gameBoard, BOARD_SIDE_SIZE);
				});
			}
		},

		checkGameOver: () => {
			if (gameBoard.shipCount === 0) {
				gameBoard.isGameOver = true;
				return true;
			}
			return false;
		},
	};
	return gameBoard;
};