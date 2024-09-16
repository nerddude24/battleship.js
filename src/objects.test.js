const { Ship, BoardCell, Gameboard } = require("./objects.js");

describe("Ship class (length == 3).", () => {
	const ship = new Ship(3);

	afterEach(() => {
		ship.hit();
	});

	test("Ship is not sunk at first.", () => {
		expect(ship.isSunk()).toBe(false);
	});

	test("Hitting once doesn't sink.", () => {
		expect(ship.isSunk()).toBe(false);
	});

	test("Hitting twice doesn't sink.", () => {
		expect(ship.isSunk()).toBe(false);
	});

	test("Hitting thrice sinks the ship.", () => {
		expect(ship.isSunk()).toBe(true);
	});
});

describe("Board cell class", () => {
	const cell = new BoardCell();

	let step = 0;
	afterEach(() => {
		if (step == 0) cell.fill(new Ship(1));
		else if (step == 1) cell.hit();

		step++;
	});

	test("Starting state is 0.", () => {
		expect(cell.getState()).toBe(BoardCell.STATES.EMPTY);
	});

	test("State after fill() is 1.", () => {
		expect(cell.getState()).toBe(BoardCell.STATES.SHIP);
	});

	test("State after hit() is 2.", () => {
		expect(cell.getState()).toBe(BoardCell.STATES.HIT);
	});

	test("Ship is sunk after hit().", () => {
		expect(cell.ship.isSunk()).toBe(true);
	});
});

describe("Gameboard class", () => {
	const board = new Gameboard();
	board.place(0, 0, new Ship(1));
	board.receiveAttack(0, 0);

	test("Board is sunk after receiving attack on it's only ship", () => {
		expect(board.isEverythingSunk()).toBe(true);
	});
});
