import EventHandler from "./events.js";
import { Gameboard, Ship } from "./objects.js";
import { randomInterval, randomXY } from "./util.js";

function buildBoard() {
	const board = new Gameboard();

	const ships = [
		new Ship(1),
		new Ship(1),
		new Ship(1),
		new Ship(1),
		new Ship(2),
		new Ship(2),
		new Ship(2, false),
		new Ship(3),
		new Ship(3, false),
		new Ship(4),
	];

	ships.forEach((ship) => {
		while (true) {
			const [x, y] = randomXY();

			if (!board.canPlace(x, y, ship)) continue;

			board.place(x, y, ship);
			break;
		}
	});

	return board;
}

function play() {
	const player = {
		board: new Gameboard(),
	};

	const bot = {
		board: new Gameboard(),
		intervalMin: 400,
		intervalMax: 1000,
	};

	let playerTurn = true;
	let gameOver = false;

	player.board = buildBoard();
	bot.board = buildBoard();

	EventHandler.emit(EventHandler.EVENTS.upPlrBrd, player.board.getCells());
	EventHandler.emit(EventHandler.EVENTS.upBotBrd, bot.board.getCells());

	const checkWinner = () => {
		if (player.board.isEverythingSunk()) {
			gameOver = true;
			alert("You lose!");
		} else if (bot.board.isEverythingSunk()) {
			gameOver = true;
			alert("You win!");
		}
	};

	// the two args are for the attacks' direction.
	const playBotTurn = (x, y, vert = null, offset = null) => {
		if (gameOver) return;
		setInterval(() => {
			const hasHitAShip = player.board.receiveAttack(x, y);
			EventHandler.emit(EventHandler.EVENTS.upPlrBrd, player.board.getCells());

			if (!hasHitAShip) {
				playerTurn = true;
				checkWinner();
				return;
			}

			// else if hit a ship:
			if (vert == null) {
				// choose a random direction to start attacking
				vert = Math.round(Math.random()) == 1;
				offset = Math.round(Math.random()) == 1 ? 1 : -1;
			}

			const nextX = !vert ? x + offset : x;
			const nextY = vert ? y + offset : y;

			// if next coordinates are out of bounds, make new random vector.
			if (nextX > 9 || nextX < 0 || nextY > 9 || nextY < 0)
				[nextX, nextY] = randomXY();

			playBotTurn(nextX, nextY, vert, offset);
		}, randomInterval(bot.intervalMin, bot.intervalMax));
	};

	const attackCell = (cell) => {
		if (gameOver) return;
		if (!playerTurn) return;
		if (cell.isHit()) return;

		const hasHitAShip = cell.hit();
		EventHandler.emit(EventHandler.EVENTS.upBotBrd, bot.board.getCells());

		if (!hasHitAShip) {
			playerTurn = false;

			const [x, y] = randomXY();
			playBotTurn(x, y);
		}
	};

	EventHandler.sub(EventHandler.EVENTS.clickedCell, attackCell);
}

play();
