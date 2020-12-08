import WebComponent from '../web-component';
import { mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
	<h3>Entry title</h3>
	<h4>Entry metadata</h4>
	<p>This is the entry description.</p>
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