class Menu extends HTMLElement {
    constructor() {
        super();

        const template = `
            <h2>Menu</h2>
        `;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = template;
    }
}

window.customElements.define('blog-menu', Menu);

export default Menu;