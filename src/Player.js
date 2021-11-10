import { GameBoard as Board } from './Battleships';
import { makeSmartAIMove, makeRandomAIMove } from './helperFunctions';

export const Player = (name, side, type = 'human', gameBoard) => {
	//测试
	const player = {
		name,
		side,
		type,
		gameBoard,
		lastAIMove: '',
		nextAIMove: '',
		moveIndicator: 1,
		isWinner: false,
		makeMove: (opponent, xCord, yCord) => {
			return opponent.gameBoard.receiveAttack(xCord, yCord);
		},
		makeAIMove: (opponent, isSmart = false) => {
			isSmart
				? makeSmartAIMove(player, opponent)
				: makeRandomAIMove(player, opponent);
		},
	};
	return player;
};

export const CreatePlayer = (side, type) => {
	const gameBoard = Board(side);
	gameBoard.makeBoard();
	gameBoard.getShips(`${side}`);
	if (type === 'computer') gameBoard.placeShipsAtRandom();
	let name;
	side === 'human-player' ? (name = 'Player') : (name = 'AI');
	return Player(name, side, type, gameBoard);
};
