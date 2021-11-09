import {
	attackShip,
	checkDirectionalShipPlacement,
	markShipOnBoard,
	markShipArea,
	handleShipCount,
	randomlyPlaceShip,
} from './helperFunctions';

const BOARD_SIDE_SIZE = 10;
// 之后这里改成5！别忘了
const FLEET_QUANTITY = 4;

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
					Ship('TIE-bomber', 2),
					Ship('Star Destroyer', 3),
					Ship('Star Destroyer', 3),
					Ship('Super Star Destroyer', 4),
					// 没有合适的size5 ship，就先不放，之后加
					// Ship('TIE-bomber', 5)
				];
			} else {
				return [
					Ship('X-wing starfighter', 2),
					Ship('Shuttle', 3),
					Ship('Shuttle', 3),
					Ship('CR90 corvette', 4),
					// Ship('MC80 Star Cruiser', 5),
				];
			}
		},
		getShips: () => {
			const shipArray = gameBoard.createShips();
			shipArray.map((ship, id) => (ship.id = id + 1));
			gameBoard.ships = shipArray;
			// console.log(gameBoard.ships);
			return shipArray;
		},

		changeShipDirection: (ship = {}) => {
			ship.direction === 'horizontal' && ship.size > 1
				? (ship.direction = 'vertical')
				: (ship.direction = 'horizontal');
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
			// console.log('Placement check');
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
				// console.log(	`${ship.name}, ${ship.direction} --> ${ship.coordinates}`);
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
