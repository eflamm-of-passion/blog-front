import WebComponent from '../web-component.js';
import { restApiClient } from '../rest-api-client';
import { cvStyle, mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
	<h1 data-bind="name"></h1>
		<h3 data-bind="position">
			<span data-bind="position"></span> - <span data-bind="company"></span>
		</h3>
	<p data-bind="description"></p>
`;


// TODO rename the class to Resume
export default class Resume extends WebComponent {
	constructor(state) {
		state = state || {};
		super(template, [cvStyle, mainThemeStyle], state);
	}

	connectedCallback() {
		super.connectedCallback();
		const self = this;
		this.getData().then(data => {
			for(const sectionData of data.sections){
				let section = document.createElement('blog-cv-section');
				section.state = sectionData;
				self.shadowRoot.appendChild(section);
			}
			self.state = Object.assign(this.state, data);
		});
	}
	
	getData() {
		// TODO get the CV data from the database
		return restApiClient.resumes.getFirst();
	}
}