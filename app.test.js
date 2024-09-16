const { Ship } = require("./app.js");

describe("Ship class (length == 3).", () => {
	const ship = new Ship(3);

	afterEach(() => {
		ship.hit();
	});

	it("Ship is not sunk at first.", () => {
		expect(ship.isSunk()).toBe(false);
	});

	it("Hitting once doesn't sink.", () => {
		expect(ship.isSunk()).toBe(false);
	});

	it("Hitting twice doesn't sink.", () => {
		expect(ship.isSunk()).toBe(false);
	});

	it("Hitting thrice sinks the ship.", () => {
		expect(ship.isSunk()).toBe(true);
	});
});
