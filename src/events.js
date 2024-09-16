const EventHandler = (() => {
	const EVENTS = Object.freeze({
		upPlrBrd: "updatePlayerBoard",
		upBotBrd: "updateBotBoard",
	});

	let _events = {};

	function sub(eventName, fn) {
		_events[eventName] = _events[eventName] || [];
		_events[eventName].push(fn);
	}

	function unsub(eventName, fn) {
		if (!_events[eventName]) return;

		for (let i = 0; i < _events[eventName].length; i++) {
			if (_events[eventName][i] === fn) {
				_events[eventName].splice(i, 1);
				break;
			}
		}
	}

	function emit(eventName, data) {
		if (!_events[eventName]) return;

		_events[eventName].forEach((fn) => {
			fn(data);
		});
	}

	return {
		sub,
		unsub,
		emit,
		EVENTS,
	};
})();

export default EventHandler;
