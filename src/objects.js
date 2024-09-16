class Ship {
	constructor(length) {
		this._len = length;
		this._hits = 0;
	}

	isSunk() {
		return this._len - this._hits <= 0;
	}

	hit() {
		this._hits = this._hits + 1;
	}
}

class BoardCell {
	static STATES = Object.freeze({
		EMPTY: 0,
		SHIP: 1,
		HIT: 2,
		HIT_SHIP: 3,
	});

	constructor() {
		this.ship = null;
		this._state = BoardCell.STATES.EMPTY;
	}

	fill(ship) {
		this.ship = ship;
		this._state = BoardCell.STATES.SHIP;
	}

	getState() {
		return this._state;
	}

	hit() {
		if (
			this.getState() == BoardCell.STATES.HIT ||
			this.getState() == BoardCell.STATES.HIT_SHIP
		)
			return;

		if (this.ship) {
			this.ship.hit();
			this._state = BoardCell.STATES.HIT_SHIP;
		} else this._state = BoardCell.STATES.HIT;
	}
}

class Gameboard {
	constructor() {
		// 10x10 2d array filled with empty cells.
		this._board = new Array(10).fill(
			new Array(10).fill().map((_) => new BoardCell())
		);
	}

	place(x, y, ship) {
		this._board[y][x].fill(ship);
	}

	receiveAttack(x, y) {
		this._board[y][x].hit();
	}

	isEverythingSunk() {
		for (let i = 0; i < this._board.length; i++) {
			for (let j = 0; j < this._board[i].length; j++) {
				const cell = this._board[i][j];
				if (cell.ship == null) continue;

				if (!cell.ship.isSunk()) return false;
			}
		}

		return true;
	}

	getCells() {
		return this._board.slice();
	}
}

export { Ship, BoardCell, Gameboard };
