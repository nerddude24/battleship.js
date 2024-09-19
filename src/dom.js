import EventHandler from "./events.js";
import { BoardCell } from "./objects.js";

(() => {
	const playerBoardElement = document.getElementById("player-board");
	const botBoardElement = document.getElementById("ai-board");
	const playerHTMLCells = new Array(10).fill().map((_) => new Array(10));
	const botHTMLCells = new Array(10).fill().map((_) => new Array(10));

	const generateCellClasses = (cellState, isPlayerCell) => {
		let classes = "cell";

		switch (cellState) {
			case BoardCell.STATES.SHIP:
				// only render ships if they are on the player's board.
				if (isPlayerCell) classes += " cell-ship";
				break;

			case BoardCell.STATES.HIT:
				classes += " cell-hit";
				break;

			case BoardCell.STATES.HIT_SHIP:
				classes += " cell-ship";
				classes += " cell-hit";
				break;

			default:
				break;
		}

		return classes;
	};

	const createHtmlCell = (cell, isPlayerCell) => {
		const htmlCell = document.createElement("div");

		htmlCell.className = generateCellClasses(cell.getState(), isPlayerCell);
		if (cell.isHit()) htmlCell.textContent = "X";

		return htmlCell;
	};

	const coldRender = (cells, isPlayerBoard) => {
		const htmlBoard = isPlayerBoard ? playerBoardElement : botBoardElement;

		htmlBoard.innerHTML = "";

		cells.forEach((row, y) =>
			row.forEach((cell, x) => {
				const htmlCell = createHtmlCell(cell, isPlayerBoard);

				// make cell clickable if it's on the bot's board.
				if (
					!isPlayerBoard &&
					(cell.getState() == BoardCell.STATES.EMPTY ||
						cell.getState() == BoardCell.STATES.SHIP)
				)
					htmlCell.addEventListener("click", () =>
						EventHandler.emit(EventHandler.EVENTS.clickedCell, {
							cell,
							x,
							y,
						})
					);

				if (isPlayerBoard) playerHTMLCells[y][x] = htmlCell;
				else botHTMLCells[y][x] = htmlCell;

				htmlBoard.appendChild(htmlCell);
			})
		);
	};

	const updateHTMLCell = (cellState, x, y, isPlayerBoard) => {
		const cellsList = isPlayerBoard ? playerHTMLCells : botHTMLCells;

		if (
			cellState == BoardCell.STATES.HIT ||
			cellState == BoardCell.STATES.HIT_SHIP
		)
			cellsList[y][x].textContent = "X";

		cellsList[y][x].className = generateCellClasses(cellState, isPlayerBoard);
	};

	const coldRenderPlayerBoard = (cells) => coldRender(cells, true);
	const coldRenderBotBoard = (cells) => coldRender(cells, false);
	const updatePlayerHTMLCell = ({ cellState, x, y }) =>
		updateHTMLCell(cellState, x, y, true);
	const updateBotHTMLCell = ({ cellState, x, y }) =>
		updateHTMLCell(cellState, x, y, false);

	EventHandler.sub(EventHandler.EVENTS.buildPlrBrd, coldRenderPlayerBoard);
	EventHandler.sub(EventHandler.EVENTS.buildBotBrd, coldRenderBotBoard);
	EventHandler.sub(EventHandler.EVENTS.upPlrBrd, updatePlayerHTMLCell);
	EventHandler.sub(EventHandler.EVENTS.upBotBrd, updateBotHTMLCell);
})();
