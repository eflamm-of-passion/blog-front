export default class Portfolio extends HTMLElement {
	constructor() {
		super();

		const template = '<p>Portfolio page</p>';

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}
}