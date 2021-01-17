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
		const component = this.render(this.shadowRoot, this.template, this.styles);
		this.shadowRoot.innerHTML = component.innerHTML;

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
		this.shadowRoot.innerHTML = this.updateDataBinding(this.shadowRoot, this.state).innerHTML;
	}

	/**
	 * Aggregates the template and the styles into a document
	 * @param {HTMLTemplateElement} template 
	 * @param {list of HTMLStyleElement} styles 
	 */
	render(root, template, styles) {
		root.innerHTML = '';
		if(this.template instanceof HTMLTemplateElement) {
			root.appendChild(template.content.cloneNode(true));
		} else {
			console.error('The style must be an HTMLTemplateElement.');
		}
		if(styles.every(style => style instanceof HTMLStyleElement)) {
			styles.forEach(style => root.appendChild(style.cloneNode(true)) );
		} else {
			console.error('The style must be an HTMLStyleElement.');
		}
		return root;
	}

	/**
	* Creates a Proxy with the initial values of the state, and updates the view everytime the values changes
	* @param { json object } state - the initial values of the state
	*/
	createState(self) {
		return new Proxy(self.state, {
			set(target, property, value) {
				target[property] = value;
				self.shadowRoot.innerHTML = self.render(self.shadowRoot, self.template, self.styles).innerHTML;
				self.shadowRoot.innerHTML = self.updateDataBinding(self.shadowRoot, self.state).innerHTML;
				return true;
			},
		});
	}

	/**
	* Updates the view with the state values. The state properties matches the element data properties.
	* @param { Proxy } state - contains the data to display in the view
	*/
	updateDataBinding(component, state) {
		
		// TODO implement conditional and list rendering

		// XXX should I get the data-model too in the querySelector ?
		const bindings = Array.from(
			component.querySelectorAll('[data-bind]')
		).map(e => e.dataset.bind);
		bindings.forEach((binding) => {
			if(component.querySelector(`[data-bind=${binding}]`)) {
				component.querySelector(`[data-bind=${binding}]`).innerHTML = state[binding];
			}
			if(component.querySelector(`[data-model=${binding}]`)){
				component.querySelector(`[data-model=${binding}]`).value = state[binding];
			}
		});
		return component;
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