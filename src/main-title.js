import style from './styles/main-title.scss';

import CustomElement from './custom-element.js';

const template = document.createElement('template');
template.innerHTML = `
	<h1 data-bind="name"></h1>
`;
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(style));

export default class MainTitle extends CustomElement {
	constructor(state) {

		state = state || { name: 'Eflamm' };

		super(template, [styleElement], state);
	}
}