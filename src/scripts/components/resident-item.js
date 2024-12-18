import DateUtils from "../utils/date-utility";

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

    _updateStyle() {
        this._style.textContent = `
            :host {
                border-radius: 8px;
            }
        `;
    }

    connectedCallback() {
        this._shadowRoot.addEventListener('click', () => {
            window.location.hash = `#/resident/${this._resident.id}`;
        });
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div class="resident-item">
                <h3>${this._resident.nama_resident}</h3>
                <p>${DateUtils.calculateAge(this._resident.tgl_lahir)}</p>
            </div>
        `;
    }    
}

customElements.define('resident-item', ResidentItem);