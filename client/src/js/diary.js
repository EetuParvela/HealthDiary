import '/src/css/diary.css';
import {fetchData} from './fetch.js';
import {renderEntries} from './entries.js';
import {showToast} from './utils.js';

// Stop access to the site if not logged in
const checkLogin = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
  }
};
checkLogin();

const displayUsername = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const url = 'http://localhost:8000/api/users/me';

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetchData(url, options);

    if (response && response.username) {
      document.getElementById('username').innerText = response.username;
    }
  } catch (err) {
    console.error('Fetching username failed', err);
  }
};
displayUsername();

// Render the entries as soon as the DOM has loaded
const init = () => {
  renderEntries();
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const saveEntry = async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('You need to login first!');
    window.location.href = 'index.html';
    return;
  }

  const entryForm = document.querySelector('.entry-form');

  const entry = {
    entry_date: entryForm.querySelector('#entry_date').value.trim(),
    mood: entryForm.querySelector('#mood').value.trim(),
    sleep_hours: entryForm.querySelector('#sleep_hours').value.trim(),
    weight: entryForm.querySelector('#weight').value.trim(),
    notes: entryForm.querySelector('#notes').value.trim(),
  };

  const url = 'http://localhost:8000/api/entries';

  const options = {
    body: JSON.stringify(entry),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Saving entry failed:', response.error);
    showToast('Tallentaminen epäonnistui!');
    return;
  }

  if (response.message) {
    showToast('Tallentaminen onnistui!')
    console.log(response.message, 'success');
  }

  console.log(response);
  entryForm.reset();
  renderEntries();
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  window.location.href = 'index.html';
};

const entryForm = document.querySelector('.entry-form');
entryForm.addEventListener('submit', saveEntry);

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', () => {
  if (confirm('Haluatko varmasti kirjautua ulos?')) {
    logout();
  }
});
