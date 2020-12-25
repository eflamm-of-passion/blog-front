/**
 * Provides data binding to the component. You have to use the 'data-bind' attribute on the elements displaying the data,
 * and 'data-model' attribute on the tags modifying the data. The value in the element attributes must match the state attributes.
 */
export default class WebComponent extends HTMLElement {
	
	/**
   	* @param {HTMLTemplateElement} template - The HTML tags injected in the component
   	* @param {json} state - the data injected in the component
   	* @param {list of HTMLStyleElement} - the styles to apply to the component
   	*/
	constructor(template, styles, state) {
		super();
		// TODO implement the template engine function
		this.template = template;
		this.state = state || {};
		this.styles = styles;
		// TODO insert the attributes in the state
	}

	/**
	 * Injects the template and the data in the component
	 * Updates the values when changes happen
	 */
	connectedCallback() {
		// Render the template inside the component, and apply the style
		this.attachShadow({ mode: 'open' });
		let documentFragment = this.aggregateTemplateAndStyles(this.template, this.styles);
		this.shadowRoot.appendChild(documentFragment);

		// Register all the data-model elements to event listeners.
		const listeners = this.shadowRoot.querySelectorAll('[data-model]');
		listeners.forEach((listener) => {
			const name = listener.dataset.model;
			listener.addEventListener('keyup', () => {
				this.state[name] = listener.value;
			});
		});

		// Instanciates the state
		this.state = this.createState(this);

		// Render the state values in the view
		this.render(this.state);
	}

	/**
	 * Aggregates the template and the styles into a document fragment
	 * @param {HTMLTemplateElement} template 
	 * @param {list of HTMLStyleElement} styles 
	 */
	aggregateTemplateAndStyles(template, styles) {
		const documentFragment = document.createDocumentFragment();
		if(this.template instanceof HTMLTemplateElement) {
			documentFragment.appendChild(template.content.cloneNode(true));
		} else {
			console.error('The style must be an HTMLTemplateElement.');
		}
		if(styles.every(style => style instanceof HTMLStyleElement)) {
			styles.forEach(style => documentFragment.appendChild(style.cloneNode(true)) );
		} else {
			console.error('The style must be an HTMLStyleElement.');
		}
		return documentFragment;
	}

	/**
	* Creates a Proxy with the initial values of the state, and updates the view everytime the values changes
	* @param { json object } state - the initial values of the state
	*/
	createState(self) {
		return new Proxy(self.state, {
			set(target, property, value) {
				target[property] = value;
				self.render(self.state);
				return true;
			},
		});
	}

	/**
	* Updates the view with the state values. The state properties matches the element data properties.
	* @param { Proxy } state - contains the data to display in the view
	*/
	render(state) {
		const bindings = Array.from(
			this.shadowRoot.querySelectorAll('[data-bind]')
		).map(e => e.dataset.bind);
		bindings.forEach((binding) => {
			if(this.shadowRoot.querySelector(`[data-bind=${binding}]`)) {
				this.shadowRoot.querySelector(`[data-bind=${binding}]`).innerHTML = state[binding];
			}
			if(this.shadowRoot.querySelector(`[data-model=${binding}]`)){
				this.shadowRoot.querySelector(`[data-model=${binding}]`).value = state[binding];
			}
		});
		const ifElements = Array.from(this.shadowRoot.querySelectorAll('[data-if]'));
		for(let ifElement of ifElements) {
			if(!this.canDisplay(this.state, ifElement.dataset.if)) {
				// TODO display none or find a way to add i back after being removed
				// ifElement.parentNode.removeChild(ifElement);
			}
		}
	}

	attributeChangedCallback(attributeName, oldValue, newValue) {
		if(newValue !== oldValue) {
			this[attributeName] = this.hasAttribute(attributeName);
			// TODO change the values in the state
			// XXX not used for the moment
		}
	}

	/**
	 * Finds in the state the value or the function to execute, and returns a boolean.
	 * It is used to know wether a component should be displayed or not.
	 * @param {object} state - state of the component 
	 * @param {string} statement - the statement name to search for in the state
	 */
	canDisplay(state, statement) {
		statement = state[statement];
		switch (typeof statement) {
		case 'function':
			return statement.call() ? true : false;
		default:
			return statement ? true : false;
		}
	}
}