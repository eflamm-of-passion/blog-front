class Router {
    routes = [];
    mode = null;
	root = '/';
	
	constructor(options) {
		this.mode = window.history.pushState ? 'history' : 'hash';
		if (options.mode) {
			this.mode = options.mode;
		}
		if (options.root) {
			this.root = options.root;
		}
	}

	/**
	 * Add a route to the router
	 * @param {*} path 
	 * @param {*} cb 
	 */
	add = (path, cb) => {
		this.routes.push({path, cb});
		return this;
	}

	/**
	 * Remove a route from the router
	 * @param {string} path - the path to remove
	 */
	remove = path => {
		return this.routes.filter((currentPath) => {
			return path !== currentPath;
		});
	}

	/**
	 * Flush all the router routes
	 */
	flush = () => {
		this.routes = [];
		return this;
	}
}

export default Router;