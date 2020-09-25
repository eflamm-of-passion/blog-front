export default class Menu extends HTMLElement {
	constructor() {
		super();

		const template = `
			<nav>
				<a class="route" href="/cv">CV</a>
				<a class="route" href="/portfolio">PORTFOLIO</a>
				<a class="route" href="/web">WEB</a>
				<a class="route" href="/misc">MISC</a>
			</nav>
		`;
		
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}
}