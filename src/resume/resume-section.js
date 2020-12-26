import WebComponent from '../web-component';
import context from '../context';
import { mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
    <section>
        <h2 data-bind="name"></h2>
		<div class="entries"></div>
		<button data-if="isEditorMode">Add an entry</button>
    </section>
`;

export default class ResumeSection extends WebComponent {
	constructor(state) {
		state = state || {};
		state.isEditorMode = context.isEditorMode;
		super(template, [mainThemeStyle], state);
		context.subscribe(this);
	}
	
	connectedCallback() {
		super.connectedCallback();
	}

	render(root, template, styles) {
		console.log('render');
		this.shadowRoot.innerHTML = super.render(root, template, styles).innerHTML;
		const entriesContainer = this.shadowRoot.querySelector('.entries');
		const lines = this.state.lines;
		lines.forEach(entryData => {
			const entryElement = document.createElement('blog-cv-entry');
			entryElement.state = entryData;
			entriesContainer.appendChild(entryElement);
		});
	}

	onContextChange(newContext) {
		this.state.isEditorMode = newContext.isEditorMode;
	}
}