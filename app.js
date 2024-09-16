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

module.exports = {
	Ship,
};
