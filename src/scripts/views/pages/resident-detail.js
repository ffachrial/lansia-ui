import { sampleLansia } from '../../data/sample-lansia.js';

const ResidentDetail = {
    async render() {
        return `
            <div class="content">
                <h2>Resident Detail</h2>
                <div id="residentDetail"></div>
            </div>
        `;
    },

    async afterRender() {
        const url = window.location.hash;
        const id = url.split('/')[2]; // Get the ID from the URL

        // Find the resident data
        const resident = sampleLansia.find(item => item.id === id);
        
        if (!resident) {
            const detailContainer = document.querySelector('#residentDetail');
            detailContainer.innerHTML = '<p>Resident not found</p>';
            return;
        }

        // Render the detail view
        const detailContainer = document.querySelector('#residentDetail');
        detailContainer.innerHTML = `
            <div class="resident-detail">
                <div class="resident-info">
                    <h3>${resident.namaLengkap}</h3>
                    <table>
                        <tr>
                            <td>Date of Birth</td>
                            <td>: ${resident.dob}</td>
                        </tr>
                        <!-- Add more resident details as needed -->
                    </table>
                </div>
                <div class="action-buttons">
                    <button id="backButton">Back to List</button>
                </div>
            </div>
        `;

        // Add back button functionality
        const backButton = document.querySelector('#backButton');
        backButton.addEventListener('click', () => {
            window.location.hash = '#/resident-list';
        });
    },
};

export default ResidentDetail;