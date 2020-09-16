import { CustomElement } from "./custom-element.js";

class MainTitle extends CustomElement {
  constructor() {
    const template = `
      <h1 data-bind="name"></h1>
      <input type="text" data-model="name" />
    `;

    const state = { name: "Eflamm" };

    super(template, state);
  }
}

window.customElements.define("blog-title", MainTitle);

export { MainTitle };
