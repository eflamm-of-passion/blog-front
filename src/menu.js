export default class Menu extends HTMLElement {
	constructor() {
		super();

		const template = `
            <h2>Menu</h2>
        `;

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}
}