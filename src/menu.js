import style from './styles/menu.scss';

import WebComponent from './web-component';

const template = document.createElement('template');
template.innerHTML = `
	<nav>
		<a class="route" href="/cv">CV</a>
		<a class="route" href="/portfolio">PORTFOLIO</a>
		<a class="route" href="/web">WEB</a>
		<a class="route" href="/misc">MISC</a>
	</nav>
`;
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(style));

export default class Menu extends WebComponent {
	constructor() {
		super(template, [styleElement]);
	}
}