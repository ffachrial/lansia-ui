import { sampleLansia } from '../data/sample-lansia.js';

const home = () => {
    const residentListElement = document.querySelector('#residentList');
    const searchBarElement = document.querySelector('search-bar');

    // Create all resident items and store for filtering
    const residentItemElements = sampleLansia.map((resident) => {
        const residentItemElement = document.createElement('resident-item');
        residentItemElement.resident = resident;
        return { element: residentItemElement, resident }; // Store element and data
    });

    // Function to render filtered residents
    const renderResidents = (filterText) => {
        residentListElement.innerHTML = ''; // Clear the list

        // Filter and append matching residents
        const filteredResidents = residentItemElements.filter(({ resident }) =>
            resident.namaLengkap.toLowerCase().includes(filterText.toLowerCase())
        );

        residentListElement.append(...filteredResidents.map(({ element }) => element));
    };

    // Initial rendering of all residents
    renderResidents('');

    // Assign callback for input changes
    searchBarElement.onInputChange = (filterText) => {
        renderResidents(filterText);
    };
};

export default home;
