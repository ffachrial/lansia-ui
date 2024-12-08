class ResidentList extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');

        this.render();
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    render() {
        this._emptyContent();
        this._shadowRoot.innerHTML += `
            <div class="list">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('resident-list', ResidentList);