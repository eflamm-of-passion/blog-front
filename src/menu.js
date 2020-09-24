export default class Menu extends HTMLElement {
	constructor() {
		super();

		const template = `
			<nav>
				<a href="/cv">CV</a>
				<a href="/portfolio">PORTFOLIO</a>
				<a href="/web">WEB</a>
				<a href="/misc">MISC</a>
			</nav>
		`;
		
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}
}