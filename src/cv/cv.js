import WebComponent from '../web-component.js';
import { cvStyle, mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
	<article>
		<h1 data-bind="name"></h1>
			<h3 data-bind="position">
				<span data-bind="position"></span> - <span data-bind="company"></span>
			</h3>
		<p data-bind="description"></p>
		<section id="professional">
		</section>
		<section id="education">
			<h2>Education</h2>
			<p><i>empty</i></p>
		</section>
		<section id="volunteering">
			<h2>Volunteering</h2>
			<p><i>empty</i></p>
		</section>
	</article>
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
			const professionalSection = document.createElement('blog-cv-section');
			professionalSection.state.name = 'Professional';
			professionalSection.state.entries = data.professional;
			self.shadowRoot.getElementById('professional').appendChild(professionalSection);
			self.state = Object.assign(this.state, data);
		});
	}
	
	getData() {
		// TODO get the CV data from the database
		const cv = Promise.resolve({
			name: 'Eflamm Ollivier',
			position: 'fullstack developper',
			company: 'Kiwatch',
			description: 'I am a 10x developper',
			professional: [
				{
					name: 'Web engineer',
					company: 'Maisons du Monde',
					location: 'Vertou, France',
					start_date: '16-06-2020',
					end_date: '20-10-2020',
					description: 'I worked on tracking tool for Maisons du Monde packages.',
					company_logo: ''
				},
				{
					name: 'Web developper',
					company: 'SMACL Assurance',
					location: 'Niort, France',
					start_date: '10-01-2018',
					end_date: '20-02-2019',
					description: 'I worked on many projects.',
					company_logo: ''
				},
			],
			education: [],
			volunteering: []
		});
		return cv;
	}
}