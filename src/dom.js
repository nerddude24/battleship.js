const EventHandler = require("./events.js");
const { BoardCell } = require("./objects.js");

const DomHandler = (() => {
	const playerBoard = document.getElementById("player-board");
	const botBoard = document.getElementById("ai-board");

	const render = (htmlBoard, board) => {
		htmlBoard.innerHTML = "";

		board.getCells().forEach((cell) => {
			const htmlCell = document.createElement("div");
			htmlCell.classList.add("cell");

			switch (cell.getState()) {
				case BoardCell.STATES.SHIP:
					htmlCell.classList.add("cell-ship");
					break;

				case BoardCell.STATES.HIT:
					htmlCell.textContent = "X";
					htmlCell.classList.add("cell-hit");
					break;

				case BoardCell.STATES.HIT_SHIP:
					htmlCell.textContent = "X";
					htmlCell.classList.add("cell-ship");
					htmlCell.classList.add("cell-hit");
					break;

				default:
					console.error("cell with invalid state (", cell.getState(), ")");
					break;
			}

			htmlBoard.appendChild(htmlCell);
		});
	};

	const renderPlayerBoard = (board) => render(playerBoard, board);
	const renderBotBoard = (board) => render(botBoard, board);

	EventHandler.sub("updatePlayerBoard", renderPlayerBoard);
	EventHandler.sub("updateBotBoard", renderBotBoard);
})();

module.exports = DomHandler;
