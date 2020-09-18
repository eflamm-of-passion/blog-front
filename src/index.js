import MainTitle from './main-title';
import Menu from './menu';

export default class BlogApp extends HTMLElement {
	constructor() {
		super();

		const template = `
            <blog-title></blog-title>
            <blog-menu></blog-menu>
        `;

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = template;
	}

	connectedCallback() {
		console.log('The blog is connected');
	}
}

window.customElements.define('blog-app', BlogApp);
window.customElements.define('blog-menu', Menu);
window.customElements.define('blog-title', MainTitle);

const appElement = document.createElement('blog-app');
document.body.appendChild(appElement);