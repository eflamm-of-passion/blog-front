import Router from ('../router.js');

test('remove a route from the router', () => {
	const options = {
		mode: 'history',
		root: '/'
	};
	const router = new Router(options);
	router.add('hello');
	expect(router.routes[0]).toBe('hello');
});