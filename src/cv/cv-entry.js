import WebComponent from '../web-component';
import { mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
	<h3 data-bind="name"></h3>
	<h4>
		<span data-bind="organisation"></span> - <span data-bind="location"></span>
	</h4>
	<p data-bind="description"></p>
	<button>Edit entry</button>
`;

export default class CurriculumEntry extends WebComponent {
	constructor(state) {
		state = state || {};
		super(template, [mainThemeStyle], state);
	}
    
	connectedCallback() {
		super.connectedCallback();
	}
}