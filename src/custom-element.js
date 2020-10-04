/**
 * Provides data binding to the component. You have to use the 'data-bind' attribute on the elements displaying the data,
 * and 'data-model' attribute on the tags modifying the data. The value in the element attributes must match the state attributes.
 */
export default class CustomElement extends HTMLElement {
	
	/**
   	* @param {HTMLTemplateElement} template - The HTML tags injected in the component
   	* @param {json} state - the data injected in the component
   	* @param {HTMLStyleElement} - the styles to apply to the component
   	*/
	constructor(template, styles, state) {
		super();
		this.template = template;
		this.state = state || {};
		this.styles = styles;
		// TODO insert the attributes in the state
	}

	/**
	 * Injects the template and the data in the component, updates the values when changes happen
	 */
	connectedCallback() {
		// Render the template inside the component, and apply the style
		this.attachShadow({ mode: 'open' });
		if(this.template instanceof HTMLTemplateElement) {
			this.shadowRoot.appendChild(this.template.content.cloneNode(true));
		}
		if(this.styles.every(style => style instanceof HTMLStyleElement)) {
			this.styles.forEach(style => this.shadowRoot.appendChild(style) );
		} else {
			console.error('The style must be an HTMLStyleElement.');
		}

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
		* Updates the view with the state values. The state properties matches the element data properties.
		* @param { Proxy } state - contains the data to display in the view
		*/
		const render = (state) => {
			const bindings = Array.from(
				this.shadowRoot.querySelectorAll('[data-bind]')
			).map((e) => e.dataset.bind);
			bindings.forEach((binding) => {
				if(this.shadowRoot.querySelector(`[data-bind=${binding}]`)) {
					this.shadowRoot.querySelector(`[data-bind=${binding}]`).innerHTML = state[binding];
				}
				if(this.shadowRoot.querySelector(`[data-model=${binding}]`)){
					this.shadowRoot.querySelector(`[data-model=${binding}]`).value = state[binding];
				}
			});
		};

		// Register all the data-model elements to event listeners.
		const listeners = this.shadowRoot.querySelectorAll('[data-model]');
		listeners.forEach((listener) => {
			const name = listener.dataset.model;
			listener.addEventListener('keyup', () => {
				this.state[name] = listener.value;
				// console.debug('The state has changed : ' + JSON.stringify(state));
			});
		});

		// Instanciates the state
		this.state = createState(this.state);

		// Render the state values in the view
		render(this.state);
	}

	attributeChangedCallback(attributeName, oldValue, newValue) {
		if(newValue !== oldValue) {
			this[attributeName] = this.hasAttribute(attributeName);
			// TODO change the values in the state
		}
	}
}