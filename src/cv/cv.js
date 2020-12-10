import WebComponent from '../web-component.js';
import { cvStyle, mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
	<h1 data-bind="name"></h1>
		<h3 data-bind="position">
			<span data-bind="position"></span> - <span data-bind="company"></span>
		</h3>
	<p data-bind="description"></p>
`;

export default class Curriculum extends WebComponent {
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
		const cv = Promise.resolve({
			uuid: '',
			name: 'Eflamm Ollivier',
			position: 'fullstack developper',
			company: 'Kiwatch',
			description: 'I am a 10x developper',
			sections: [
				{
					uuid: '',
					order: 1,
					name: 'Professional',
					lines : [
						{
							uuid: '',
							order: 1,
							name: 'Web engineer',
							organisation: 'Maisons du Monde',
							location: 'Vertou, France',
							startDate: '16-06-2020',
							endDate: '20-10-2020',
							description: 'I worked on tracking tool for Maisons du Monde packages.',
							organisationLogo: ''
						},
						{
							uuid: '',
							order: 2,
							name: 'Web developper',
							organisation: 'SMACL Assurance',
							location: 'Niort, France',
							startDate: '10-01-2018',
							endDate: '20-02-2019',
							description: 'I worked on many projects.',
							organisationLogo: ''
						}
					]
				}
			],
		});
		return cv;
	}
}