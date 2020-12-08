import WebComponent from './web-component';

const template = document.createElement('template');
template.innerHTML = `
	<h3 data-bind="title"></h3>
	<p data-bind="message"></p>
`;

export default class Error extends WebComponent {
	constructor(state) {

		state = state || {
			title: 'An error has occured',
			message: 'This is an unexpected behavior.'
		};
        
		super(template, [], state);
	}
}