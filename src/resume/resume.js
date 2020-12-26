import WebComponent from '../web-component.js';
import { restApiClient } from '../rest-api-client';
import { cvStyle, mainThemeStyle } from '../style';

// TODO render the sections when state changes

const template = document.createElement('template');
template.innerHTML = `
	<h1 data-bind="name"></h1>
		<h3 data-bind="position">
			<span data-bind="position"></span> - <span data-bind="company"></span>
		</h3>
	<p data-bind="description"></p>
`;

export default class Resume extends WebComponent {
	constructor(state) {
		state = state || {};
		super(template, [cvStyle, mainThemeStyle], state);
	}

	connectedCallback() {
		super.connectedCallback();
		const self = this;
		// find a proper way to handle the render after a state change
		this.getData().then(data => {
			self.state = Object.assign(self.state, data);
			for(const sectionData of data.sections){
				let section = document.createElement('blog-cv-section');
				section.state = {...section.state, ...sectionData};
				self.shadowRoot.appendChild(section);
			}
		});
	}
	
	getData() {
		return restApiClient.resumes.getFirst();
	}
}