import { sampleLansia } from '../data/sample-lansia.js';

const home = () => {
    // Get elements from id residentList
    const residentListElement = document.querySelector('#residentList');

    // Create all notes    
    const residentItemElements = sampleLansia.map((resident) => {
        const residentItemElement = document.createElement('resident-item');
        residentItemElement.resident = resident;

        return residentItemElement;
    })

    // Append all notes
    residentListElement.append(...residentItemElements);
};

export default home;