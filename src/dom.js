import EventHandler from "./events.js";
import { BoardCell } from "./objects.js";

const DomHandler = (() => {
	const playerBoard = document.getElementById("player-board");
	const botBoard = document.getElementById("ai-board");

	const render = (htmlBoard, board) => {
		htmlBoard.innerHTML = "";

		board.getCells().forEach((row) =>
			row.forEach((cell) => {
				const htmlCell = document.createElement("div");
				htmlCell.classList.add("cell");

				switch (cell.getState()) {
					case BoardCell.STATES.SHIP:
						if (htmlBoard == playerBoard) htmlCell.classList.add("cell-ship");
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
						break;
				}

				htmlBoard.appendChild(htmlCell);
			})
		);
	};

	const renderPlayerBoard = (board) => render(playerBoard, board);
	const renderBotBoard = (board) => render(botBoard, board);

	EventHandler.sub(EventHandler.EVENTS.upPlrBrd, renderPlayerBoard);
	EventHandler.sub(EventHandler.EVENTS.upBotBrd, renderBotBoard);
})();
