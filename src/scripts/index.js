import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';

import { sampleLansia } from '../scripts/data/sample-lansia';

// Get elements from id notesList
const notesListElement = document.querySelector('#notesList');

// Create note item using HTML tags with id, namaLansia, and dob
function createNoteItemElement({ id, namaLansia, dob }) {  
  return `
    <div data-noteid="${id}" class="note-item">
      <h3>${namaLansia}</h3>
      <p>${dob}</p>
    </div>
  `;
}

// Create all notes
const listOfNoteItem = sampleLansia.map((lansia) => {
  return createNoteItemElement(lansia);
});

/**
 * Render all notes
 * 
 * Remember! The output of map() is array. We must joining all element of array because it is string.
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
notesListElement.innerHTML = listOfNoteItem.join('');
    