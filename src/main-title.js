import style from './styles/main-title.scss';

import CustomElement from './custom-element.js';

export default class MainTitle extends CustomElement {
	constructor(state) {
		const template = `
			<h1 data-bind="name"></h1>
			<input type="text" data-model="name" />
		`;

		state = state || { name: 'Eflamm' };

		super(template, state, [style]);
	}
}