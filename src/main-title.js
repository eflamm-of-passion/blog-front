import {mainTitleStyle, popTextStyle} from './style';

import CustomElement from './custom-element.js';

const template = document.createElement('template');
template.innerHTML = `
	<h1 data-bind="name"></h1>
`;

export default class MainTitle extends CustomElement {
	constructor(state) {

		state = state || { name: 'Eflamm' };

		super(template, [mainTitleStyle, popTextStyle], state);
	}
}