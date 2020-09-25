/**
 * Provides data binding to the component. You have to use the 'data-bind' attribute on the elements displaying the data,
 * and 'data-model' attribute on the tags modifying the data. The value in the element attributes must match the state attributes.
 */
export default class CustomElement extends HTMLElement {
	/**
   * Injects the template and the data in the component, updates the values when changes happen
   * @param {multiline string} template - The HTML tags injected in the component
   * @param {json object} state - the data injected in the component
   */
	constructor(template, state, styles) {
		super();

		// Render the template inside the component, and apply the style
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = template;
		// TODO iterate to add each stylesheet
		const styleElement = document.createElement('style');
		styleElement.textContent = styles;
		shadowRoot.append(styleElement);

		/**
     * Creates a Proxy with the initial values of the state, and updates the view everytime the values changes
     * @param { json object } state - the initial values of the state
     */
		const createState = (state) => {
			return new Proxy(state, {
				set(target, property, value) {
					target[property] = value;
					render(state);
					return true;
				},
			});
		};

		/**
     * Updates the view with the state values. The state attributes matches the element data attributes.
     * @param { Proxy } state - contains the data to display in the view
     */
		const render = (state) => {
			const bindings = Array.from(
				shadowRoot.querySelectorAll('[data-bind]')
			).map((e) => e.dataset.bind);
			bindings.forEach((binding) => {
				shadowRoot.querySelector(`[data-bind=${binding}]`).innerHTML = state[binding];
				shadowRoot.querySelector(`[data-model=${binding}]`).value = state[binding];
			});
		};

		/**
     * Register all the data-model elements to event listeners.
     */
		const listeners = shadowRoot.querySelectorAll('[data-model]');
		listeners.forEach((listener) => {
			const name = listener.dataset.model;
			listener.addEventListener('keyup', () => {
				this.state[name] = listener.value;
				// console.debug('The state has changed : ' + JSON.stringify(state));
			});
		});

		// Instanciates the state
		this.state = createState(state);

		// Render the state values in the view
		render(this.state);
	}
}