import CustomElement from "./custom-element.js";

export default class MainTitle extends CustomElement {
  constructor() {
    const template = `
      <h1 data-bind="name"></h1>
      <input type="text" data-model="name" />
    `;

    const state = { name: "Eflamm" };

    super(template, state);
  }
}