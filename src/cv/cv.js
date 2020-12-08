import WebComponent from '../web-component.js';
import { cvStyle, mainThemeStyle } from '../style';

const template = document.createElement('template');
template.innerHTML = `
	<article>
		<h1 data-bind="name"></h1>
			<h3 data-bind="position">
				<span data-bind="position"></span>
				-
				<span data-bind="company"></span>
			</h3>
		<p data-bind="description"></p>
		<section id="professional">
			<blog-cv-section></blog-cv-section>
		</section>
		<section id="education">
			<h2>Education</h2>
			<p><i>EMPTY</i></p>
		</section>
		<section id="volunteering">
			<h2>Volunteering</h2>
			<p><i>EMPTY</i></p>
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
		this.state = Object.assign(this.state, this.getData());
	}
	
	getData() {
		// TODO get the CV data from the database
		const cv = {
			name: 'Eflamm Ollivier',
			position: 'fullstack developper',
			company: 'Kiwatch',
			description: 'I am a 10x developper',
			professional: [],
			education: [],
			volunteering: []
		};
		return cv;
	}
}