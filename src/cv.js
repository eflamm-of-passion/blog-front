export default class Curriculum extends HTMLElement {
	constructor() {
		super();

		const template = '<p>CV page</p>';

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}
}