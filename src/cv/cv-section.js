import WebComponent from '../web-component.js';
import { mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
    <section>
        <h2>Title of the section</h2>
		<div>
			<blog-cv-entry></blog-cv-entry>
			<button>Add an entry</button>
		</div>
    </section>
`;

export default class CurriculumSection extends WebComponent {
	constructor(state) {
		state = state || {};
		super(template, [mainThemeStyle], state);
	}
	
	connectedCallback() {
		super.connectedCallback();
	}
}