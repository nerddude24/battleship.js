import EventHandler from "./events.js";
import { Gameboard, Ship } from "./objects.js";

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

	const randomCoord = () => [
		Math.floor(Math.random() * 10),
		Math.floor(Math.random() * 10),
	];

	ships.forEach((ship) => {
		while (true) {
			const [x, y] = randomCoord();

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
	};

	let playerTurn = true;

	player.board = buildBoard();
	bot.board = buildBoard();

	EventHandler.emit(EventHandler.EVENTS.upPlrBrd, player.board);
	EventHandler.emit(EventHandler.EVENTS.upBotBrd, bot.board);

	/* //while (!player.board.isEverythingSunk() && !bot.board.isEverythingSunk()) {}

	if (player.board.isEverythingSunk()) alert("You lost!");
	else alert("You won!"); */
}

play();
