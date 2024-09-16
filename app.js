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
	});

	constructor() {
		this.ship = null;
		this._state = BoardCell.STATES.EMPTY;
	}

	fill(ship) {
		this.ship = ship;
		this._state = BoardCell.STATES.SHIP;
	}

	isHit() {
		return this._state == BoardCell.STATES.HIT;
	}

	hit() {
		if (this.isHit()) return;

		if (this.ship) this.ship.hit();
		this._state = BoardCell.STATES.HIT;
	}
}

module.exports = {
	Ship,
};
