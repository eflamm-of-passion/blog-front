import {mainTitleStyle} from './style';

import WebComponent from './web-component.js';

const template = document.createElement('template');
template.innerHTML = `
	<h1 data-bind="name"></h1>
`;

export default class MainTitle extends WebComponent {
	constructor(state) {

		state = state || { name: 'Eflamm' };

		super(template, [mainTitleStyle], state);
	}
}