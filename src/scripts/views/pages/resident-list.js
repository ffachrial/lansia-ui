import { sampleLansia } from '../../data/sample-lansia.js';

const ResidentList = {
    async render() {
        // We don't need to render these elements since they're already in index.html
        return `
            <div class="content">
                <h2>Resident List</h2>
                <search-bar></search-bar>
                <div id="residentList" class="list"></div>
            </div>
        `;
    },
   
    async afterRender() {
        // Get the existing elements from the DOM
        const residentListElement = document.querySelector('#residentList');
        const searchBarElement = document.querySelector('search-bar');

        if (!residentListElement || !searchBarElement) {
            console.error('Required elements not found');
            return;
        }

        // Create all resident items and store for filtering
        const residentItemElements = sampleLansia.map((resident) => {
            const residentItemElement = document.createElement('resident-item');
            residentItemElement.resident = resident;
            return { element: residentItemElement, resident };
        });

        // Function to render filtered residents
        const renderResidents = (filterText) => {
            residentListElement.innerHTML = ''; // Clear the list

            // Filter and append matching residents
            const filteredResidents = residentItemElements.filter(({ resident }) =>
                resident.namaLengkap.toLowerCase().includes(filterText.toLowerCase())
            );

            filteredResidents.forEach(({ element }) => {
                residentListElement.appendChild(element);
            });
        };

        // Initial rendering of all residents
        renderResidents('');

        // Assign callback for input changes
        searchBarElement.onInputChange = (filterText) => {
            renderResidents(filterText);
        };
    },
};
   
export default ResidentList;