class SearchBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');

        this._inputChangeCallback = null;

        this.render();
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    _updateStyle() {
        this._style.textContent = `
                .form-group {
                    display: flex;
                    justify-content: center;
                    position: sticky;
                    top: 0;
                    background-color: white;
                    z-index: 10;
                    padding: 8px 0;
                }

                form {
                    width: 100%;
                    max-width: 400px;
                }

                input {
                    font-family: Raleway, sans-serif;
                    width: 100%;
                    background: #f5f1ff;
                    border: 2px solid black;
                    border-radius: 15px;
                    padding: 16px;
                    font-size: 24px;
                    box-sizing: border-box;
                    margin: 8px 0;
                }
        `;
    }
    // Setter for the input change callback
    set onInputChange(callback) {
        this._inputChangeCallback = callback;

        // Add event listener to the input field
        const searchInput = this._shadowRoot.querySelector('#searchInput');
        searchInput.addEventListener('input', (event) => {
            if (this._inputChangeCallback) {
                this._inputChangeCallback(event.target.value);
            }
        });
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div class="form-group">
                <form id="searchForm">
                    <input type="text" id="searchInput" placeholder="Cari warga...">
                </form>
            </div>
        `;
    }
}

customElements.define('search-bar', SearchBar);