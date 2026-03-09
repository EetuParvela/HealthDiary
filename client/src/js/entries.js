import {fetchData} from './fetch.js';
import {showToast} from './utils.js';

const getEntries = async () => {
  console.log('Getting entries')
  const url = 'http://localhost:8000/api/entries';
  let headers = {};
  let token = localStorage.getItem('token');

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  const options = {
    headers: headers,
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error login in', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
  return response;
};

const deleteEntry = async (entryId) => {
  if (!confirm('Haluatko varmasti poistaa tämän merkinnän?')) return;

  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:8000/api/entries/${entryId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      showToast('Poistaminen onnistui!')
      renderEntries('entries-list');
    } else {
      showToast('Poistaminen epäonnistui!')
    }
  } catch (err) {
    console.error('Virhe poistossa:', err);
  }
};

const renderEntries = async () => {
  const entryList = document.querySelector('.entries-list')

  if (!entryList) return;

  const entries = await getEntries();

  if (!entries || entries.lenght === 0) {
    entryList.innerHTML =
      '<p style="text-align:center; color: #666;">Ei vielä merkintöjä.</p>';
    return;
  }

  entryList.innerHTML = '';

  entries.forEach((entry) => {
    const dateFormatted = new Date(entry.entry_date).toLocaleDateString(
      'fi-FI',
    );

    const card = document.createElement('div');
    card.className = 'entry-card';
    card.innerHTML = `<div class="entry-header">
        <span>${dateFormatted}</span>
        <span>Fiilis: <strong>${entry.mood}/10</strong></span>
      </div>
      <div class="entry-stats">
        <span>Uni: ${entry.sleep_hours}h</span>
        <span>Paino: ${entry.weight}kg</span>
      </div>
      <div class="entry-notes">
        ${entry.notes ? `<p>${entry.notes}</p>` : '<em>Ei muistiinpanoja</em>'}
      </div>
      <button class="delete-btn" data-id="${entry.entry_id}">Poista</button>`;
    entryList.appendChild(card);
  });
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    deleteEntry(id);
  }
});

export {getEntries, deleteEntry, renderEntries};
