import WebComponent from '../web-component';
import context from '../context';
import { mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
    <section>
        <h2 data-bind="name"></h2>
		<div class="entries"></div>
		<button>Add an entry</button>
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
		const entriesContainer = this.shadowRoot.querySelector('.entries');
		const lines = this.state.lines;
		for(const entryData of lines){
			const entryElement = document.createElement('blog-cv-entry');
			entryElement.state = {...entryElement.state, ...entryData};
			entriesContainer.appendChild(entryElement);
		}
		return this.shadowRoot;
	}

	onContextChange(newContext) {
		this.state.isEditorMode = newContext.isEditorMode;
	}
}