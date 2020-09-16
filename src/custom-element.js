/**
 * Add the data binding to the componnent. You have to use the 'data-bind' attribute in the tags displaying the data,
 * and 'data-model' attribute in the tags modifying the data. The value in these attributes must match the state attributes.
 */
class CustomElement extends HTMLElement {
  /**
   *
   * @param {multine string} template - The HTML tags
   * @param {json object} state - the component attributes
   */
  constructor(template, state) {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = template;

    const createState = (state) => {
      return new Proxy(state, {
        set(target, property, value) {
          target[property] = value;
          render(state);
          return true;
        },
      });
    };

    const render = (state) => {
      const bindings = Array.from(
        shadowRoot.querySelectorAll("[data-bind]")
      ).map((e) => e.dataset.bind);
      bindings.forEach((binding) => {
        shadowRoot.querySelector(`[data-bind=${binding}]`).innerHTML =
          state[binding];
        shadowRoot.querySelector(`[data-model=${binding}]`).value =
          state[binding];
      });
    };

    const listeners = shadowRoot.querySelectorAll("[data-model]");
    listeners.forEach((listener) => {
      const name = listener.dataset.model;
      listener.addEventListener("keyup", (event) => {
        state[name] = listener.value;
        console.log(state);
      });
    });

    state = createState(state);

    render(state);
  }
}

export { CustomElement };
