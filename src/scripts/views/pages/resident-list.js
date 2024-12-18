import KV2SupabaseSource from '../../data/kv2-supabase-source.js';

const ResidentList = {
    async render() {
        // We don't need to render these elements since they're already in index.html
        return `
            <div class="content">
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

        // Fetch residents using the data source
        const fetchResidents = async () => {
            try {
                return await KV2SupabaseSource.getAllResidents();
            } catch (error) {
                console.error('Error fetching residents:', error);
                return [];
            }
        };

        // Create resident items
        const createResidentElements = (residents) => {
            return residents.map((resident) => {
                const residentItemElement = document.createElement('resident-item');
                residentItemElement.resident = resident;
                return { element: residentItemElement, resident };
            });
        };

        // Initial fetch and creation of elements
        const residents = await fetchResidents();
        const residentItemElements = createResidentElements(residents);

        // Function to render filtered residents
        const renderResidents = (filterText) => {
            residentListElement.innerHTML = ''; // Clear the list

            // Filter and append matching residents
            const filteredResidents = residentItemElements.filter(({ resident }) =>
                resident.nama_resident.toLowerCase().includes(filterText.toLowerCase())
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