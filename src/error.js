import CustomElement from './custom-element';

export default class Error extends CustomElement {
	constructor(state) {

		state = state || {
			title: 'An error has occured',
			message: 'This is an unexpected behavior.'
		};
        
		const template = `
			<h3>${state.title}</h3>
			<p>${state.message}</p>
		`;
		
		super(template, state);
	}
}