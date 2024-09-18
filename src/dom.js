import EventHandler from "./events.js";
import { BoardCell } from "./objects.js";

(() => {
	const playerBoard = document.getElementById("player-board");
	const botBoard = document.getElementById("ai-board");

	const createHtmlCell = (cell, isPlayer) => {
		const htmlCell = document.createElement("div");
		htmlCell.classList.add("cell");

		switch (cell.getState()) {
			case BoardCell.STATES.SHIP:
				if (isPlayer) htmlCell.classList.add("cell-ship");
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

		return htmlCell;
	};

	const render = (htmlBoard, cells) => {
		htmlBoard.innerHTML = "";

		cells.forEach((row) =>
			row.forEach((cell) => {
				const htmlCell = createHtmlCell(cell, htmlBoard == playerBoard);

				htmlBoard.appendChild(htmlCell);
			})
		);
	};

	const renderPlayerBoard = (cells) => render(playerBoard, cells);
	const renderBotBoard = (cells) => render(botBoard, cells);

	EventHandler.sub(EventHandler.EVENTS.upPlrBrd, renderPlayerBoard);
	EventHandler.sub(EventHandler.EVENTS.upBotBrd, renderBotBoard);
})();
