import EventHandler from "./events.js";
import { Gameboard } from "./objects.js";

function play() {
	const player = {
		board: new Gameboard(),
	};

	const bot = {
		board: new Gameboard(),
	};

	EventHandler.emit(EventHandler.EVENTS.upPlrBrd, player.board);
	EventHandler.emit(EventHandler.EVENTS.upBotBrd, bot.board);

	while (!player.board.isEverythingSunk() && !bot.board.isEverythingSunk()) {
		// do game
	}

	if (player.board.isEverythingSunk()) alert("You lost!");
	else alert("You won!");
}

play();
