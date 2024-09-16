import EventHandler from "./events.js";
import { Gameboard } from "./objects.js";

function startNewGame() {
	const player = {
		board: new Gameboard(),
	};

	const bot = {
		board: new Gameboard(),
	};

	EventHandler.emit(EventHandler.EVENTS.upPlrBrd, player.board);
	EventHandler.emit(EventHandler.EVENTS.upBotBrd, bot.board);
}

startNewGame();
