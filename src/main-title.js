class MainTitle extends HTMLElement {
    constructor() {
        super();

        const template =`
            <h1>Eflamm</h1>
        `;

        const shadowRoot = this.attachShadow({mode : "open"});
        shadowRoot.innerHTML = template;
    }
}

window.customElements.define('blog-title', MainTitle);


export { MainTitle };