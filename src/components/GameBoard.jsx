import React from 'react';

const GameBoard = (props) => {
	const { player, board, isGameReady } = props;
	return (
		<div className={`${player.side} game-board`}>
			<div className={`${player.side} side-title`}>{player.name} Board</div>
			<div className="outer-wrapper">
				{/* {BOARD} */}
				<div className="board-wrapper">
					<div className="inner-wrapper">
						<div className={`${player.side} grid-wrapper ${player.type}`}>
							{player.gameBoard.board.map((arr, j) =>
								arr.map((element, i) => {
									if (player.type === 'human') {
										if (element === '_' || element === '*') {
											if (element === '_' && !isGameReady) {
												return (
													<div
														className="cell droppable"
														data-cord={[j + 1, i + 1]}
														key={[j + 1, i + 1]}
														onDragOver={(e) => {
															e.preventDefault();
														}}
														onDragEnter={(e) => {
															e.preventDefault();
															e.target.classList.add('hover');
														}}
														onDragLeave={(e) => {
															e.preventDefault();
															e.target.classList.remove('hover');
														}}
														onDrop={(e) => props.onPlaceShip(e)}
													></div>
												);
											} else {
												return (
													<div
														className="cell"
														data-cord={[j + 1, i + 1]}
														key={[j + 1, i + 1]}
													></div>
												);
											}
										} else if (Number.isInteger(parseInt(element))) {
											let ship = player.gameBoard.ships[element - 1];
											return (
												<div
													className={`cell ship ship${ship.id}`}
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													{parseFloat(ship.coordinates[0]) === i + 1 &&
														parseFloat(ship.coordinates[1]) === j + 1 && (
															<img
																className={`ship-img-grid ${ship.direction}`}
																src={
																	process.env.PUBLIC_URL +
																	`/images/${player.side}${ship.size}.png`
																}
																alt={`ship-${player.side}${ship.size}`}
															/>
														)}
												</div>
											);
										} else if (element === '???') {
											return (
												<div
													className={`cell hit ship`}
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													<img
														className={`hit-png `}
														src={process.env.PUBLIC_URL + '/images/hit.png'}
														alt="flames"
													/>
												</div>
											);
										} else {
											return (
												<div
													className={`cell empty`}
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													???
												</div>
											);
										}
									}
									// AI Board
									else {
										if (element === '???') {
											return (
												<div
													className="cell empty"
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													???
												</div>
											);
										} else if (element === '???') {
											return (
												<div
													className="cell hit"
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													<img
														className={`hit-png `}
														src={process.env.PUBLIC_URL + '/images/hit.png'}
														alt="as"
													/>
												</div>
											);
										} else {
											return (
												<div
													className="cell"
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
													onClick={(e) => props.onMakeMove(e)}
												></div>
											);
										}
									}
								})
							)}{' '}
						</div>
					</div>
				</div>
				{!isGameReady && (
					<div className="ship-menage-wrapper">
						<div className="button-container">
							<button className="star-btn" onClick={props.onPlaceRandomly}>
								Place randomly
							</button>
							<button className="star-btn" onClick={props.onResetBoard}>
								Reset Board
							</button>
						</div>
						<div className="ship-wrapper">
							{player.gameBoard.ships.map((ship) => {
								return (
									!ship.onBoard && (
										<div
											className={`ship-view ${ship.direction}`}
											key={`ship${ship.id}`}
										>
											<img
												className={`ship-img ${ship.direction} size${ship.size}` }
												src={
													process.env.PUBLIC_URL +
													`/images/${player.side}${ship.size}.png`
												}
												alt={`ship-${player.side}${ship.size}`}
												key={`ship-${player.side}${ship.id}`}
												data-ship={ship.id}
												draggable
												onDragStart={(e) => {
													e.dataTransfer.setData('ship', e.target.dataset.ship);
												}}
											/>
										</div>
									)
								);
							})}
						</div>
					</div>
				)}
			</div>
			{!isGameReady && (
				<div className="button-container">
					<button
						className="start-game-btn star-btn"
						onClick={props.onStartGame}
					>
						Play
					</button>
				</div>
			)}
		</div>
	);
};

export default GameBoard;
