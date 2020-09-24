export default class Router {
	
	constructor(routes, links, fallBack) {

		const handleLoad = () => {
			resolveRoute(window.location.pathname);
		};

		const handleLinkClicked = (e) => {
			e.preventDefault();
			if (e.target.tagName === 'A') {
				window.history.pushState({}, null, e.target.href);
				// TODO find the corresponding route
				resolveRoute(e.target.pathname);
			}
		};
		
		const resolveRoute = (path) => {
			const route = routes.find(r => r.path === path);
			if (route) {
				route.callback(route.container, route.component, route.state);
			} else {
				if(fallBack) {
					// TODO redirect to the fallback component
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