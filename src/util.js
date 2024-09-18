const randomXY = () => [
	Math.floor(Math.random() * 10),
	Math.floor(Math.random() * 10),
];

const randomInterval = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export { randomXY, randomInterval };
