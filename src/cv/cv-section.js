import WebComponent from '../web-component.js';
import { mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
    <section>
        <h2 data-bind="name"></h2>
		<div class="entries">
		</div>
		<button>Add an entry</button>
    </section>
`;

export default class CurriculumSection extends WebComponent {
	constructor(state) {
		state = state || {};
		super(template, [mainThemeStyle], state);
	}
	
	connectedCallback() {
		super.connectedCallback();
		const entriesContainer = this.shadowRoot.querySelector('.entries');
		this.state.entries.forEach(entryData => {
			const entryElement = document.createElement('blog-cv-entry');
			entryElement.state = entryData;
			entriesContainer.appendChild(entryElement);
		});
	}
}