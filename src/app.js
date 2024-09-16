const DomHandler = require("./dom.js");
const { Gameboard } = require("./objects.js");

function startNewGame() {
	const player = {
		board: new Gameboard(),
	};

	const bot = {
		board: new Gameboard(),
	};
}

startNewGame();
