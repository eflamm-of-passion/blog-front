export default class Router {
	
	constructor(routes, links, fallBack) {

		/**
		 * Resolve the route when the page loads
		 */
		const handleLoad = () => {
			resolveRoute(window.location.pathname);
		};

		/**
		 * Resolve the route when a link <a> is clicked 
		 * @param {MouseEvent} e 
		 */
		const handleLinkClicked = (e) => {
			e.preventDefault();
			if (e.target.tagName === 'A') {
				window.history.pushState({}, null, e.target.href);
				resolveRoute(e.target.pathname);
			}
		};

		/**
		 * Resolve a path to the corresponding route
		 * @param {string} path - the path in the current URL
		 */
		const resolveRoute = (path) => {
			const route = routes.find(r => r.path === path);
			if (route) {
				route.callback(route.container, route.component, route.state);
			} else {
				if(fallBack) {
					fallBack.callback(fallBack.container, fallBack.component, fallBack.state);
				} else {
					console.error('No fallback link provided');
				}
			}
		};

		window.addEventListener('load', handleLoad);
		links.forEach(link => link.addEventListener('click', handleLinkClicked) );
	}
}