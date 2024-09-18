class Ship {
	constructor(length, vertical = true) {
		this._len = length;
		this.vertical = vertical;

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
		this._board = new Array(10)
			.fill()
			.map((_) => new Array(10).fill().map((_) => new BoardCell()));
	}

	_isEmptyCell(x, y) {
		return (
			x < 0 ||
			x > 9 ||
			y < 0 ||
			y > 9 ||
			this._board[y][x].getState() == BoardCell.STATES.EMPTY
		);
	}

	_isPlaceableCell(x, y) {
		// check if cell is out of bounds.
		if (x < 0 || x > 9 || y < 0 || y > 9) return false;
		if (!this._isEmptyCell(x, y)) return false;

		// adjacent cells must be empty
		const left = x == 0 || this._isEmptyCell(x - 1, y);
		const right = x == 9 || this._isEmptyCell(x + 1, y);
		const top = y == 0 || this._isEmptyCell(x, y - 1);
		const bot = y == 9 || this._isEmptyCell(x, y + 1);
		const topLeft = this._isEmptyCell(x - 1, y - 1);
		const topRight = this._isEmptyCell(x + 1, y - 1);
		const botLeft = this._isEmptyCell(x - 1, y + 1);
		const botRight = this._isEmptyCell(x + 1, y + 1);

		return (
			top && bot && right && left && topLeft && topRight && botLeft && botRight
		);
	}

	canPlace(x, y, ship) {
		// check if entire ship can fit
		if (ship.vertical) {
			for (let lenY = y; lenY < y + ship._len; lenY++)
				if (!this._isPlaceableCell(x, lenY)) return false;
		} else {
			for (let lenX = x; lenX < x + ship._len; lenX++)
				if (!this._isPlaceableCell(lenX, y)) return false;
		}

		return true;
	}

	place(x, y, ship) {
		if (ship.vertical) {
			for (let lenY = y; lenY < y + ship._len; lenY++)
				this._board[lenY][x].fill(ship);
		} else {
			for (let lenX = x; lenX < x + ship._len; lenX++)
				this._board[y][lenX].fill(ship);
		}
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
