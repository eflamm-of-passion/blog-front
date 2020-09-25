import MainTitle from './main-title';
import Menu from './menu';
import Curriculum from './cv';
import Portfolio from './portfolio';
import Error from './error';
import Router from './router';
import {switchComponent} from './route';

export default class BlogApp extends HTMLElement {
	constructor() {
		super();

		const template = `
            <blog-title></blog-title>
			<blog-menu></blog-menu>
			<div id="switch"></div>
		`;
		
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = template;

		const switchDiv = this.shadowRoot.querySelector('#switch');

		const routes = [
			{container: switchDiv, path: '/', component: new Curriculum(), callback: switchComponent },
			{container: switchDiv, path: '/cv', component: new Curriculum(), callback: switchComponent },
			{container: switchDiv, path: '/portfolio', component: new Portfolio(), callback: switchComponent },
		];
		const fallBackState = { title: 'Page not found', message: 'The URL you asked does not exist.'};
		const fallBackRoute = {container: switchDiv, component: new Error(fallBackState), callback: switchComponent};

		const links = this.shadowRoot.querySelector('blog-menu').shadowRoot.querySelectorAll('.route');
		new Router(routes, links, fallBackRoute);
	}

	connectedCallback() {
		console.log('The blog is connected');
	}
}

window.customElements.define('blog-app', BlogApp);
window.customElements.define('blog-menu', Menu);
window.customElements.define('blog-title', MainTitle);
window.customElements.define('blog-cv', Curriculum);
window.customElements.define('blog-portfolio', Portfolio);
window.customElements.define('blog-error', Error);

const appElement = document.createElement('blog-app');
document.body.appendChild(appElement);