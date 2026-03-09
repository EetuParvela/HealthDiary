import { fetchData } from './fetch.js';

const registerUser = async (event) => {
  event.preventDefault();

  const registerForm = document.querySelector('.register-form');

  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  const url = 'http://localhost:8000/api/users';

  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Rekisteröityminen epäonnistui:', response.error);
    showToast('Rekisteröityminen epäonnistui');
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
  registerForm.reset();
};

const loginUser = async (event) => {
  event.preventDefault();

  const loginForm = document.querySelector('.login-form');

  const username = loginForm.querySelector('#username').value.trim();
  const password = loginForm.querySelector('#password').value.trim();

  const bodyData = {
    username: username,
    password: password,
  };

  const url = 'http://localhost:8000/api/users/login';

  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Kirjautuminen epäonnistui:', response.error);
    showToast('Kirjautuminen epäonnistui');
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
    localStorage.setItem('token', response.token);
    localStorage.setItem('name', response.user.username);
    setTimeout(function () {
      window.location.href = 'diary.html';
    }, 3000);
  }

  loginForm.reset();
};

function showToast(message) {
  const container = createContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

function createContainer() {
  const div = document.createElement('div');
  div.id = 'toast-container';
  document.body.appendChild(div);
  return div;
}

const registerForm = document.querySelector('.register-form');
registerForm.addEventListener('submit', registerUser);

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', loginUser);

export {showToast}
