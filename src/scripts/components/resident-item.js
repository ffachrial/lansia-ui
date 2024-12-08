class ResidentItem extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _resident = {
        id: null,
        namaLengkap: null,
        dob: null
    };

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    set resident(value) {
        this._resident = value;

        this.render();
    }

    get resident() {
        return this._resident;
    }

    render() {
        this._emptyContent();
        this._shadowRoot.innerHTML += `
            <div>
                <h3>${this._resident.namaLengkap}</h3>
                <p>${this._resident.dob}</p>
            </div>
        `;
    }    
}

customElements.define('resident-item', ResidentItem);